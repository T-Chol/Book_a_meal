from dotenv import load_dotenv
import os

# Load correct .env file based on environment
env_file = os.getenv("FLASK_ENV", "development") == "production" and ".env.production" or ".env"
load_dotenv(env_file)

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwtsecretkey')
