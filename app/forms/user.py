import re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User


def username_exists(form, field):
    # Checking if username exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != form.data['user_id']:
        raise ValidationError('username is already in use')


def email_exists(form, field):
    # Checking if username exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != form.data['user_id']:
        raise ValidationError('email is already in use')


def valid_email(form, field):
    email = field.data
    valid = re.match(r'^[\w\d!$-_]+@[\w\d]+.[\w\d]+$', email)
    if not valid:
        raise ValidationError('must provide a valid email')


class UserForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[
                           DataRequired("user ID required")])

    first_name = StringField('first_name', validators=[
        DataRequired('must submit a first name'), Length(1, 40)])

    last_name = StringField('last_name', validators=[
        DataRequired('must submit a last name'), Length(1, 40)])

    username = StringField('username', validators=[
        DataRequired('must submit a username'), Length(1, 40), username_exists])

    email = StringField('email', validators=[DataRequired(
        'must submit an email'), Length(1, 40), valid_email, email_exists])
