from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(1, 40)])

    description = StringField('description', validators=[
                              DataRequired(), Length(1, 1000)])

    category = StringField('category', validators=[
                           DataRequired(), Length(1, 40)])

    location_id = StringField('location_id', validators=[DataRequired()])
