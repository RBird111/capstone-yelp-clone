from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import BusinessForm
from app.models import db, Business

business_routes = Blueprint("businesses", __name__)

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


@business_routes.route('')
def get_all_businesses():
    """
    GET all businesses
    """
    businesses = Business.query.all()

    if not businesses:
        return {'error': 'Error trying to load businesses.'}

    return {'businesses': [business.to_dict() for business in businesses]}


@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    """
    POST create new business
    """
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    new_business = Business(
        name=form.data['name'],
        description=form.data['description'],
        category=form.data['category'],
        location_id=form.data['location_id'],
    )

    db.session.add(new_business)
    db.session.commit()

    return {'business': new_business.to_dict()}, 201


@business_routes.route('/<int:id>')
def get_business(id):
    """
    GET business by id
    """
    business = Business.query.get(id)

    if not business:
        return {'error': 'Business could not be found.'}, 404

    return {'business': business.to_dict()}


@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_business(id):
    """
    PUT update business by id
    """
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    business = Business.query.get(id)

    if not business:
        return {'error': 'Business could not be found.'}, 404

    business.name = form.data['name']
    business.description = form.data['description']
    business.category = form.data['category']
    business.location_id = form.data['location_id']

    db.session.commit()

    return {'business': business.to_dict()}


@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_business(id):
    """
    DELETE business with associated id
    """
    business = Business.query.get(id)

    if not business:
        return {'error': 'Business could not be found.'}, 404

    db.session.delete(business)
    db.session.commit()

    return {'message': 'Business sucessfully deleted.'}
