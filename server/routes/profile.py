from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

bp = Blueprint('user_routes', __name__)

# Get user profile - Protected route
@bp.route('/profile', methods=['GET'])
@jwt_required()  # This decorator ensures that the user is authenticated (JWT required)
def profile():
    # Get the current user's identity (user id from JWT)
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Return user data (adjust as needed)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
    }), 200
