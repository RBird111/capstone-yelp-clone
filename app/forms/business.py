from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BusinessForm(FlaskForm):
    name = StringField('name', validators=[
                       DataRequired('must submit name'), Length(1, 40)])

    description = StringField('description', validators=[
                              DataRequired('must submit description'), Length(1, 1000)])

    category = StringField('category', validators=[
                           DataRequired('must submit category'), Length(1, 40)])

    location_id = StringField('location_id')

    address = StringField('address', validators=[
                          DataRequired('must submit an address'), Length(1, 40)])

    city = StringField('city', validators=[
                       DataRequired('must submit city'), Length(1, 40)])

    state = StringField('state', validators=[
                        DataRequired('must submit state'), Length(1, 40)])

    owner_id = StringField('owner_id')
