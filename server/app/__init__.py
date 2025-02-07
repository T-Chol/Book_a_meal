from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from models.database import db  # Import db from models.database
from routes import register_routes 

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

    # Register routes
    register_routes(app)

    return app