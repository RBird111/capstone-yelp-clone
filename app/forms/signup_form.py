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
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def valid_email(form, field):
    email = field.data
    valid = re.match(r'^[\w\d!$-_]+@[\w\d]+.[\w\d]+$', email)
    if not valid:
        raise ValidationError('Must provide valid email.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[
                             DataRequired(), Length(1, 40)])

    last_name = StringField('last_name', validators=[
                            DataRequired(), Length(1, 40)])

    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(1, 40)])

    email = StringField('email', validators=[
                        DataRequired(), user_exists, Length(1, 40), valid_email])

    password = StringField('password', validators=[DataRequired()])
