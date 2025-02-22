from .database import db
from .menu import Menu
from .user import User

class MyCart(db.Model):
    __tablename__ = "my_cart"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey("menu.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    # Relationships
    user = db.relationship("User", back_populates="carts")
    # user = db.relationship("User", backref="cart_items")
    meal = db.relationship("Menu", backref="cart_orders")
    __table_args__ = {"extend_existing": True}

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "meal_id": self.meal_id,
            "quantity": self.quantity,
            "meal": self.meal.to_dict() if self.meal else None,  # Embed meal details
        }
