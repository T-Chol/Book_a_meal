# server/routes/__init__.py

from .user import bp as user_bp
from .profile import bp as profile_bp

def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(profile_bp)

__all__ = ['register_routes']
