from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta
from .config import Config
from models.database import db 
from routes import register_routes

migrate = Migrate()
cors = CORS()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    # Create the Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)

    # JWT settings to be moved to config.py
    app.config["JWT_SECRET_KEY"] = "your_secret_key"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    # Initialize extensions with the app
    cors.init_app(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # all the routes
    register_routes(app)

    return app
