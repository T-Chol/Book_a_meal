# server/routes/order.py
from flask import Blueprint, request, jsonify
from models.menu import Menu
from models.order import Order
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

from models.user import User

bp = Blueprint("order_routes", __name__)

@bp.route("/order", methods=["POST"])
@jwt_required()
def place_order():
    data = request.get_json()
    
    # Get user from JWT token
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    order_items = data.get("items")  # [{'menu_id': 1, 'quantity': 2}, ...]

    try:
        # Start a transaction to ensure atomicity
        for item in order_items:
            menu_item = Menu.query.get(item['menu_id'])
            if not menu_item:
                return jsonify({"error": f"Menu item with ID {item['menu_id']} not found"}), 404
            
            # Check if enough quantity is available
            if menu_item.quantity < item['quantity']:
                return jsonify({"error": f"Not enough {menu_item.name} in stock"}), 400

            # Reduce the quantity of the menu item
            menu_item.quantity -= item['quantity']
            
            # Create an order record
            order = Order(
                user_id=user.id,
                menu_item_id=menu_item.id,
                quantity=item['quantity'],
                total_price=menu_item.price * item['quantity']
            )
            db.session.add(order)

        # Commit the changes after processing all items
        db.session.commit()

        return jsonify({"message": "Order placed successfully"}), 201

    except IntegrityError:
        db.session.rollback()  # Rollback in case of any error
        return jsonify({"error": "Failed to place order due to database error"}), 500
