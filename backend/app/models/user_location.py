from .db import db, environment, SCHEMA, add_prefix_for_prod


class UserLocation(db.Model):
    # Table properties
    __tablename__ = 'user_locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40))

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("locations.id")), nullable=False)

    user = db.relationship("User", back_populates="locations")
    location = db.relationship("Locations", back_populates="users")

    # Model methods
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,

            'user_id': self.user_id,
            'user': self.user,

            'location_id': self.location_id,
            'location': self.location,
        }
