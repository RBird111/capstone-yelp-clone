from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class LocationForm(FlaskForm):
    address = StringField('address', validators=[
                          DataRequired('must submit an address'), Length(1, 40)])

    city = StringField('city', validators=[
                       DataRequired('must submit city'), Length(1, 40)])

    state = StringField('state', validators=[
                        DataRequired('must submit state'), Length(1, 40)])
