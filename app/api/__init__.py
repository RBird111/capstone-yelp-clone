from flask import Blueprint
from .auth_routes import auth_routes
from .business_routes import business_routes
from .image_routes import image_routes
from .location_routes import location_routes
from .review_routes import review_routes
from .user_routes import user_routes

api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(business_routes, url_prefix='/businesses')
api.register_blueprint(image_routes, url_prefix='/images')
api.register_blueprint(location_routes, url_prefix='/location')
api.register_blueprint(review_routes, url_prefix='/reviews')
api.register_blueprint(user_routes, url_prefix='/user')
