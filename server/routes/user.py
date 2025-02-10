# server/routes/user.py
from flask import Blueprint, request, jsonify
from models import db, User
from models.user import bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta
from werkzeug.security import check_password_hash 



# user_bp = Blueprint('user', __name__)
bp = Blueprint('user_routes', __name__)



bp = Blueprint('auth', __name__)



@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # Check if the user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400
    # Normalize role to lowercase before saving
    role = data['role'].lower()  # Ensure the role is lowercase
    # Create a new user
    user = User(username=data['username'], email=data['email'], role=role)
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 200


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'email' in data:
        user = User.query.filter_by(email=data['email']).first()
    elif 'username' in data:
        user = User.query.filter_by(username=data['username']).first()
    else:
        return jsonify({"message": "Email or username is required"}), 400

    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid email/username or password"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify({
        "access_token": access_token,
        "role": user.role,
        "username": user.username
    }), 200
