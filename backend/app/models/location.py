from .db import db, environment, SCHEMA


class Location(db.Model):
    # Table properties
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    lat = db.Column(db.Numeric)
    lng = db.Column(db.Numeric)

    business = db.relationship("Business", back_populates="location")
    users = db.relationship("UserLocation", back_populates="location")

    # Model methods
    def to_dict(self):
        return {
            'id': self.id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'lat': self.lat,
            'lng': self.lng,
            'business': self.business,
            'users': self.users,
        }
