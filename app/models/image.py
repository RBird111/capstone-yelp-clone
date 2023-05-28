from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    # Table properties
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    url_full = db.Column(db.String(500))
    url_regular = db.Column(db.String(500))
    url_small = db.Column(db.String(500))

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("businesses.id")))
    review_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("reviews.id")))

    user = db.relationship("User", back_populates="images")
    business = db.relationship("Business", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    # Model methods

    # Full instance
    def to_dict(self):
        return {
            'id': self.id,
            'url_full': self.url_full,
            'url_regular': self.url_regular,
            'url_small': self.url_small,

            'user_id': self.user_id,
            'user': self.user.to_obj(),

            'business_id': self.business_id,
            'business': self.business.to_obj(),

            'review_id': self.review_id,
            'review': self.review.to_obj(),
        }

    # Partial instance to avoid circular logic
    def to_obj(self):
        return {
            'id': self.id,
            'url_full': self.url_full,
            'url_regular': self.url_regular,
            'url_small': self.url_small,
        }
