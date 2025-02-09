# server/app/__init__.py
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from models.database import db  # Import db from models.database
from routes import register_routes 
from flask_jwt_extended import JWTManager
# from flask_bcrypt import Bcrypt
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# Initialize extensions
migrate = Migrate()
cors = CORS()

def create_app(config_class=Config):
    # Create the Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    bcrypt.init_app(app)
    JWTManager(app)
    # cors.init_app(app, resources={r"/*": {"origins": "http://localhost:3000"}})


    # Register routes
    register_routes(app)

    return app