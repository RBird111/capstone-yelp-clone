from .db import db, environment, SCHEMA


class Location(db.Model):
    # Table properties
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns

    # Model methods
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    country = db.Column(db.String(40), nullable=False)
    lat = db.Column(db.Numeric)
    lng = db.Column(db.Numeric)

    # Model methods
    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'lat': self.lat,
            'lng': self.lng,
        }
