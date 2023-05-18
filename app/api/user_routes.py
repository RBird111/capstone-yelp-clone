from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import UserForm
from app.models import db, User

user_routes = Blueprint('users', __name__)


def validation_errors_to_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

    return errorMessages


@user_routes.route('/', methods=['GET'])
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()

    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    return user.to_dict()


@user_routes.route('/curr', methods=['PUT'])
@login_required
def update_user():
    """
    PUT update current user
    """
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    user = User.query.get(current_user.id)

    if not user:
        return {'errors': ['User could not be found']}, 404

    user.first_name = form.data['first_name']
    user.last_name = form.data['last_name']
    user.username = form.data['username']
    user.email = form.data['email']
    user.password = form.data['password']

    db.session.commit()

    return {'user': user.to_dict()}


@user_routes.route('/curr', methods=['DELETE'])
@login_required
def delete_user():
    """
    DELETE current user account
    """
    user_id = current_user.id
    user = User.query.get(current_user.id)

    if not user:
        return {'errors': ['User could not be found']}, 404

    db.session.delete(user)
    db.session.commit()

    return {'message': f'User #{user_id} successfully deleted'}
