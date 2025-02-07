from flask import request, jsonify, Blueprint
from models.user import User, RoleEnum  # Import User and RoleEnum from models.user
from models.database import db  # Import db from models.database

# Create a Blueprint for user routes
bp = Blueprint('user_routes', __name__)

@bp.route('/signUp', methods=['POST'])
def register():
    data = request.get_json()
    
    # Get user input from the request
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")
    
    # Check if both fields are provided
    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400
    if not password:
        return jsonify({"error": "Password is required"}), 400

    # Check if the email or username already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username is already taken"}), 400

    # Validate the role
    try:
        role_enum = RoleEnum(role)
    except ValueError:
        return jsonify({"error": "Invalid role"}), 400

    # Create a new user and add it to the database
    new_user = User(username=username, role=role_enum, password=password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@bp.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role.value  # Return the enum value
    })