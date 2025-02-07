# server/routes/__init__.py

from .user import bp as user_bp
# from .product_routes import bp as product_bp

def register_routes(app):
    # Register all Blueprints (routes)
    app.register_blueprint(user_bp)
    # app.register_blueprint(product_bp)

# Export the function for easier use in app/__init__.py
__all__ = ['register_routes']
