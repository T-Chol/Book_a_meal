# server/routes/menu.py
from flask import Blueprint, request, jsonify
from models.menu import Menu
from app import db
from flask_jwt_extended import jwt_required

bp = Blueprint("menu_routes", __name__)

# Fetch menu
@bp.route("/menu", methods=["GET"])
@jwt_required()  # Ensure only authenticated users can fetch menu
def get_menu():
    menu_items = Menu.query.all()
    return jsonify([item.to_dict() for item in menu_items]), 200


# Add a new menu item
@bp.route("/menu", methods=["POST"])
@jwt_required()
def add_menu_item():
    data = request.get_json()

    required_fields = ["name", "description", "price", "quantity", "picture"]
    if not all(key in data for key in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_menu_item = Menu(**data)
    db.session.add(new_menu_item)
    db.session.commit()

    return jsonify({"message": "Menu item added successfully", "menu": new_menu_item.to_dict()}), 201


# Update a menu item
@bp.route("/menu<int:menu_id>", methods=["PUT"])
@jwt_required()
def update_menu_item(menu_id):
    menu_item = Menu.query.get(menu_id)
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    data = request.get_json()
    for key, value in data.items():
        setattr(menu_item, key, value)
    
    db.session.commit()
    return jsonify({"message": "Menu item updated", "menu": menu_item.to_dict()}), 200


# Delete a menu item
@bp.route("/menu<int:menu_id>", methods=["DELETE"])
@jwt_required()
def delete_menu_item(menu_id):
    menu_item = Menu.query.get(menu_id)
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted"}), 200
