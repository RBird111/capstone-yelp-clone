from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.image import ImageForm
from app.models import db, Image
from app.s3 import upload_file_to_s3, get_unique_filename, remove_file_from_s3

image_routes = Blueprint("images", __name__)


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


@image_routes.route("/<int:id>", methods=["GET"])
def get_image_by_id(id):
    """
    GET image by id
    """
    image = Image.query.get(id)

    if not image:
        return {'errors': 'Image could not be found'}

    return {'image': image.to_dict()}


@image_routes.route("", methods=["GET"])
def get_all_images():
    """
    GET all images
    """
    images = Image.query.all()

    if not images:
        return {'errors': 'Error loading images'}

    return {'images': [image.to_dict() for image in images]}


@image_routes.route("/curr", methods=["GET"])
@login_required
def get_user_images():
    """
    GET current user's images
    """
    images = Image.query.where(Image.user_id == current_user.id)

    return {'images': [image.to_dict() for image in images]}


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    """
    POST upload image to S3
    """

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_messages(form.errors)}, 401

    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 404

    new_image = Image(
        url=upload['url'],
        user_id=current_user.id,
        business_id=form.data['business_id'],
        review_id=form.data['review_id'],
    )

    db.session.add(new_image)
    db.session.commit()

    return {'image': new_image.to_dict()}


@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_image(id):
    """
    DELETE image from S3
    """
    image = Image.query.get(id)

    if not image:
        return {'errors': 'Image could not be found'}

    ret = remove_file_from_s3(image["url"])

    if ret != True:
        return ret

    db.session.delete(image)
    db.session.commit()

    return {'message': 'Image successfully deleted.'}
