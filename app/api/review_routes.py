from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import ReviewForm
from app.models import db, Review

review_routes = Blueprint("reviews", __name__)


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


@review_routes.route('/<int:id>', methods=['GET'])
def get_review(id):
    """
    GET review by id
    """
    review = Review.query.get(id)

    if not review:
        return {'errors': ['Review not found.']}, 404

    return {'review': review.to_dict()}


@review_routes.route('', methods=['GET'])
def get_all_reviews():
    """
    GET all reviews
    """
    reviews = Review.query.all()

    if not reviews:
        return {'errors': ['Error retrieving reviews.']}, 404

    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('', methods=['POST'])
def create_review():
    """
    POST create new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    review = Review(
        rating=form.data['rating'],
        body=form.data['body'],
        business_id=form.data['business_id'],
        user_id=current_user.id,
    )

    db.session.add(review)
    db.session.commit()

    return {'review': review.to_dict()}


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_location(id):
    """
    PUT update review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_sbumit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    review = Review.query.get(id)

    if not review:
        return {'errors': ['Review could not be found.']}, 404

    review.rating = form.data['rating']
    review.body = form.data['body']
    review.business_id = form.data['business_id']

    db.session.commit()

    return {'review': review.to_dict()}


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    DELETE review
    """
    review = Review.query.get(id)

    if not review:
        return {'errors': ["Review could not be found."]}, 404

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted.'}
