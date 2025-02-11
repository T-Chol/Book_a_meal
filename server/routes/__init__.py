# server/routes/__init__.py

from .user import bp as user_bp
from .profile import bp as profile_bp
from .menu import bp as menu_bp
def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(menu_bp)

__all__ = ['register_routes']
