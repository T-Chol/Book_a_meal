from enum import Enum
from .database import db
from flask_bcrypt import Bcrypt
 

# Define the Role enum
class RoleEnum(Enum):
    CHEF = 'chef'
    USER = 'user'
    ADMIN = 'admin'

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(4), nullable=False)
    role = db.Column(db.Enum(RoleEnum), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.password}', '{self.role}')"