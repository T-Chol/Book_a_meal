# # server/models/order.py
# from .database import db
# from .user import User
# from .menu import Menu

# class Available(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     menu_item_id = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     total_price = db.Column(db.Float, nullable=False)

#     user = db.relationship('User', backref='orders')
#     menu_item = db.relationship('Menu', backref='orders')