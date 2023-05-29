from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField
from app.s3 import ALLOWED_EXTENSIONS


class ImageForm(FlaskForm):
    image = FileField("image", validators=[
        FileRequired("must submit an image file"),
        FileAllowed(list(ALLOWED_EXTENSIONS))])

    business_id = IntegerField('business_id')

    review_id = IntegerField('review_id')
