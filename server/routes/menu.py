from flask import Blueprint, request, jsonify
from models.menu import Menu
from app import db
from flask_jwt_extended import jwt_required

bp = Blueprint("menu_routes", __name__)

#  Fetch menu
@bp.route("/menu", methods=["GET"])
@jwt_required()  # Ensure only authenticated users can fetch menu
def get_menu():
    menu_items = Menu.query.all()
    
    if not menu_items:
        return jsonify([]), 200  # Return an empty array instead of an error

    return jsonify([item.to_dict() for item in menu_items]), 200


#  Add a new menu item
@bp.route("/menu", methods=["POST"])
@jwt_required()
# try:
#     user = User.query.get(get_jwt_identity()) 
    # if not user.role == "caterer":                       # shall be used to restrict access to caterers only
#         return jsonify({"error": "Unauthorized"}), 403
def add_menu_item():
    data = request.get_json()

    required_fields = ["name", "description", "price", "quantity", "picture"]
    if not all(key in data for key in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_menu_item = Menu(
            name=data["name"],
            description=data["description"],
            price=float(data["price"]),
            quantity=int(data["quantity"]),
            picture=data["picture"]
        )

        db.session.add(new_menu_item)
        db.session.commit()

        return jsonify({"message": "Menu item added successfully", "menu": new_menu_item.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500


# ✅ Update a menu item
@bp.route("/menu<int:menu_id>", methods=["PUT"])
@jwt_required()
def update_menu_item(menu_id):
    menu_item = Menu.query.get(menu_id)
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    data = request.get_json()
    menu_item.name = data.get("name", menu_item.name)
    menu_item.description = data.get("description", menu_item.description)
    menu_item.price = data.get("price", menu_item.price)
    menu_item.quantity = data.get("quantity", menu_item.quantity)
    menu_item.picture = data.get("picture", menu_item.picture)

    db.session.commit()
    return jsonify({"message": "Menu item updated", "menu": menu_item.to_dict()}), 200


# ✅ Delete a menu item
@bp.route("/menu<int:menu_id>", methods=["DELETE"])
@jwt_required()
def delete_menu_item(menu_id):
    menu_item = Menu.query.get(menu_id)
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted"}), 200
