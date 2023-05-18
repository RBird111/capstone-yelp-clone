from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


# Function that returns a list of error messasges
def validation_errors_to_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

    return errorMessages


# User authentication
@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    return current_user.to_dict()


# User login
@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    # If the form has errors
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    # Add the user to the session, we are logged in!
    user = User.query.filter(
        (User.email == form.data['credential']) |
        (User.username == form.data['credential'])
    ).first()

    login_user(user)

    return user.to_dict()


# Log out user
@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()

    return {'message': 'User logged out'}


# Sign up new user
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # If form has errors
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    user = User(
        first_name=form.data['first_name'],
        last_name=form.data['last_name'],
        username=form.data['username'],
        email=form.data['email'],
        password=form.data['password']
    )

    db.session.add(user)
    db.session.commit()

    login_user(user)
    return user.to_dict()


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
