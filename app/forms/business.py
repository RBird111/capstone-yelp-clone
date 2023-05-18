from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class BusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    location_id = StringField('location_id', validators=[DataRequired()])
