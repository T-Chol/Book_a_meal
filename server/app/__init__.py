# server/app/__init__.py
import os
from flask import Flask
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv  # Import dotenv
from .config import Config
from models.database import db
from routes import register_routes

# Load .env file based on environment
env_file = ".env.production" if os.getenv("FLASK_ENV") == "production" else ".env"
load_dotenv(env_file)

# Initialize Flask Extensions
migrate = Migrate()
cors = CORS()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    """Create and configure the Flask app"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Ensure JWT Secrets are loaded correctly
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_secret_key")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=int(os.getenv("JWT_ACCESS_EXPIRES", "15")))
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=4)

    # Configure CORS (allow frontend requests)
    frontend_origin = os.getenv("FRONTEND_URL", "http://localhost:3000")
    cors.init_app(app, resources={r"/*": {"origins": frontend_origin, "supports_credentials": True}})

    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register routes
    register_routes(app)

    return app
