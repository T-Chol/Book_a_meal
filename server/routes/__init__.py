# server/routes/__init__.py

from .user import bp as user_routes
from .profile import bp as profile_bp
from .menu import bp as menu_bp
from .order import bp as order_routes
from .myCart import bp as myCart_routes
def register_routes(app):
    app.register_blueprint(user_routes)
    app.register_blueprint(profile_bp)
    app.register_blueprint(menu_bp)
    app.register_blueprint(order_routes)
    app.register_blueprint(myCart_routes)

__all__ = ['register_routes']
