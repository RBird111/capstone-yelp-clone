from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[
        DataRequired('must submit rating')])

    body = StringField('body', validators=[DataRequired(
        'must submit a review body'), Length(1, 1000)])

    business_id = IntegerField('business_id', validators=[DataRequired(
        'review must have an associated business id')])
