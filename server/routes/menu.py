from flask import Blueprint, request, jsonify
from models.menu import Menu
from app import db
import uuid
from flask_jwt_extended import jwt_required

bp = Blueprint("menu_routes", __name__)

@bp.route("/menu", methods=["POST"])
@jwt_required()
def add_menu_item():
    data = request.get_json()

    required_fields = ["id", "name", "description", "price", "quantity", "picture"]
    if not all(key in data for key in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        data["quantity"] = int(data["quantity"])  # ✅ Ensure quantity is an integer
        data["price"] = float(data["price"])  # ✅ Ensure price is a float
        
        existing_menu_item = Menu.query.get(data["id"])
        
        if existing_menu_item:
            # ✅ Ensure quantity is added correctly
            existing_menu_item.quantity += data["quantity"]
        else:
            # ✅ Create a new menu item
            new_menu_item = Menu(
                id=data["id"],
                name=data["name"],
                description=data["description"],
                price=data["price"],
                quantity=data["quantity"],
                picture=data["picture"]
            )
            db.session.add(new_menu_item)
        
        db.session.commit()

        return jsonify({
            "message": "Menu item added/updated successfully",
            "menu": existing_menu_item.to_dict() if existing_menu_item else new_menu_item.to_dict()
        }), 201

    except ValueError:
        return jsonify({"error": "Invalid data type for quantity or price"}), 400



@bp.route("/menu", methods=["GET"])
@jwt_required()
def get_menu():
    menu_items = Menu.query.all()
    return jsonify([item.to_dict() for item in menu_items]), 200
