from flask import Blueprint, request, jsonify
from models.database import db 
from models.user import bcrypt, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
from werkzeug.security import check_password_hash 

bp = Blueprint('auth', __name__)

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400
    
    role = data.get('role', 'user').lower()  # Default to 'user' if not provided
    user = User(username=data['username'], email=data['email'], role=role)
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 200

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data.get('email')) \
        .first() or User.query.filter_by(username=data.get('username')).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid email/username or password"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    refresh_token = create_access_token(identity=user.id, expires_delta=timedelta(days=7), fresh=False)

    return jsonify({
        "refresh_token": refresh_token,
        "access_token": access_token,
        "role": user.role,
        "username": user.username
    }), 200

@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    new_token = create_access_token(identity=get_jwt_identity(), expires_delta=timedelta(minutes=15))
    return jsonify({"access_token": new_token}), 200
