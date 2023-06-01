from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    # Table properties
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)

    locations = db.relationship("UserLocation", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    images = db.relationship("Image", back_populates="user")
    owned_business = db.relationship("Business", back_populates="owner")

    # Model methods
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Model methods

    # Full instance
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,

            'locations': [location.to_obj() for location in self.locations],
            'reviews': [review.to_obj() for review in self.reviews],
            'images': [image.to_obj() for image in self.images],
            'owned_business': self.owned_business[0].to_obj() if self.owned_business else None,
        }

    # Partial instance to avoid circular logic
    def to_obj(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
        }
