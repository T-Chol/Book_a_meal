# server/routes/home.py
from flask import Blueprint

bp = Blueprint("home_routes", __name__)

@bp.route("/")  # ✅ Add this to prevent 301 redirects
def home():
    return {"message": "Welcome to Book a Meal API"}, 200
