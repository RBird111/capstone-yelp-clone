from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class UserForm(FlaskForm):
    first_name = StringField('first_name', validators=[
                             DataRequired(), Length(1, 40)])

    last_name = StringField('last_name', validators=[
                            DataRequired(), Length(1, 40)])

    username = StringField('username', validators=[
                           DataRequired(), Length(1, 40)])

    email = StringField('email', validators=[DataRequired(), Length(1, 40)])

    password = StringField('password', validators=[DataRequired()])
