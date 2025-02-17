import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'supersecretkey')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwtsecretkey')
