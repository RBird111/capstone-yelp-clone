from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import LocationForm
from app.models import db, Location

location_routes = Blueprint("location", __name__)


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


@location_routes.route('', methods=['GET'])
def get_all_locations():
    """
    GET all locations
    """
    locations = Location.query.all()

    if not locations:
        return {'errors': ['Error tryinig to load locations.']}, 404

    return {'locations': [location.to_dict() for location in locations]}


@location_routes.route('/<int:id>', methods=['GET'])
def get_location(id):
    """
    GET location by id
    """
    location = Location.query.get(id)

    if not location:
        return {'errors': ['Location not found.']}, 404

    return {'location': location.to_dict()}


@location_routes.route('', methods=['POST'])
@login_required
def create_location():
    """
    POST create new location
    """
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    location = Location(
        address=form.data['address'],
        city=form.data['city'],
        state=form.data['state'],
    )

    db.session.add(location)
    db.session.commit()

    return {'location': location.to_dict()}


@location_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_location(id):
    """
    PUT update location
    """
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_sbumit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    location = Location.query.get(id)

    if not location:
        return {'errors': ['Location could not be found.']}, 404

    location.address = form.data['address']
    location.city = form.data['city']
    location.state = form.data['state']

    db.session.commit()

    return {'location': location.to_dict()}


@location_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_location(id):
    """
    DELETE location
    """
    location = Location.query.get(id)

    if not location:
        return {'errors': ['Location could not be found.']}, 404

    db.session.delete(location)

    return {'message': 'Location sucessfully deleted.'}
