from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class LocationForm(FlaskForm):
    address = StringField('address', validators=[
                          DataRequired(), Length(1, 40)])

    city = StringField('city', validators=[DataRequired(), Length(1, 40)])

    state = StringField('state', validators=[DataRequired(), Length(1, 40)])
