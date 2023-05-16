from .db import db, environment, SCHEMA, add_prefix_for_prod


class Business(db.Model):
    # Table properties
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(40))

    location_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("locations.id")), nullable=False)

    location = db.relationship("Location", back_populates="business")
    reviews = db.relationship("Review", back_populates="business")
    images = db.relationship("Image", back_populates="business")

    # Model methods

    # Full instance
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,

            'location_id': self.location_id,
            'location': self.location.to_obj(),

            'reviews': [review.to_obj() for review in self.reviews],
            'images': [image.to_obj() for image in self.images],
        }

    # Partial instance to avoid circular logic
    def to_obj(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
        }
