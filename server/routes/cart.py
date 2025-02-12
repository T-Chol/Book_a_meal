# server/routes/cart.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.order import Order

bp = Blueprint("cart_routes", __name__)

@bp.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()  # Get user from the JWT token
    cart_items = Order.query.filter_by(user_id=user_id).all()  # Get all orders for the logged-in user
    
    # Create a list of items in the cart
    cart = []
    for order in cart_items:
        menu_item = order.menu_item  # Assuming each order has a 'menu_item' relationship
        cart.append({
            'id': menu_item.id,
            'name': menu_item.name,
            'price': menu_item.price,
            'quantity': order.quantity
            
        })
    
    return jsonify(cart), 200
