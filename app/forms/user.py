from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class UserForm(FlaskForm):
    first_name = StringField('first_name', validators=[
                             DataRequired('must submit a first name'), Length(1, 40)])

    last_name = StringField('last_name', validators=[
                            DataRequired('must submit a last name'), Length(1, 40)])

    username = StringField('username', validators=[
                           DataRequired('must submit a username'), Length(1, 40)])

    email = StringField('email', validators=[DataRequired(
        'must submit an email'), Length(1, 40)])

    password = StringField('password', validators=[
                           DataRequired('must submit a password')])
