import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('username is already in use')


def valid_email(form, field):
    email = field.data
    valid = re.match(r'^[\w\d!$-_]+@[\w\d]+.[\w\d]+$', email)
    if not valid:
        raise ValidationError('must provide a valid email')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[
                             DataRequired("must submit a first name"), Length(1, 40)])

    last_name = StringField('last_name', validators=[
                            DataRequired('must submit a last name'), Length(1, 40)])

    email = StringField('email', validators=[
                        DataRequired('must submit an email'), user_exists, Length(1, 40), valid_email])

    username = StringField(
        'username', validators=[DataRequired('must submit a username'), username_exists, Length(1, 40)])

    password = StringField('password', validators=[
                           DataRequired('must enter a password')])
