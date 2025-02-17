# server/models/user.py
# from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from enum import Enum
from models.database import db

bcrypt = Bcrypt()

class RoleEnum(Enum):
    USER = "user"
    ADMIN = "admin"
    CATERER = "caterer"

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    _role = db.Column("role", db.String(50), nullable=False)

    
 # Relationship
    carts = db.relationship('MyCart', back_populates='user', cascade='all, delete-orphan')

    @property
    def role(self):
        return self._role.lower()  # Ensure the role is returned in lowercase

    @role.setter
    def role(self, value):
        self._role = value.lower()  # Ensure the role is stored in lowercase

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User id={self.id}, username={self.username}, email={self.email}, role={self.role}>"
