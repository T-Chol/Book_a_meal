from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.myCart import MyCart
from models.menu import Menu
from models.user import User
from app import db

bp = Blueprint("myCart_routes", __name__)

# ✅ Get user's cart
@bp.route("/myCart", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = MyCart.query.filter_by(user_id=user_id).all()

    print("DEBUG - User ID:", user_id)
    print("DEBUG - Cart Items:", cart_items)

    return jsonify([item.to_dict() for item in cart_items]), 200


# ✅ Add items to cart (Bulk insert)
@bp.route("/myCart", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not isinstance(data, list):
        return jsonify({"error": "Invalid data format, expected a list"}), 400

    for item in data:
        meal_id = item.get("meal_id")  # ✅ Ensure correct key
        quantity = item.get("quantity", 1)

        if not meal_id or quantity <= 0:
            return jsonify({"error": "Invalid meal ID or quantity"}), 400

        # Check if meal exists
        meal = Menu.query.get(meal_id)
        if not meal:
            return jsonify({"error": f"Meal ID {meal_id} not found"}), 404

        # Check if item exists in cart
        existing_item = MyCart.query.filter_by(user_id=user_id, meal_id=meal_id).first()
        if existing_item:
            existing_item.quantity += quantity
            db.session.flush()  # ✅ Ensure changes are seen before commit
        else:
            new_cart_item = MyCart(user_id=user_id, meal_id=meal_id, quantity=quantity)
            db.session.add(new_cart_item)

    db.session.commit()
    return jsonify({"message": "Cart updated successfully"}), 201


# ✅ Remove item from cart
@bp.route("/myCart/<int:cart_id>", methods=["DELETE"])
@jwt_required()
def remove_cart_item(cart_id):
    user_id = get_jwt_identity()
    cart_item = MyCart.query.filter_by(id=cart_id, user_id=user_id).first()

    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Cart item removed"}), 200


# ✅ Clear entire cart
@bp.route("/myCart/clear", methods=["DELETE"])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()
    MyCart.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"message": "Cart cleared"}), 200
