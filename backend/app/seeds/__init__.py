from flask.cli import AppGroup
from app.models.db import environment
from .businesses import seed_businesses, undo_businesses
from .locations import seed_locations, undo_locations
from .user_locations import seed_user_locations, undo_user_locations
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_businesses()
        undo_user_locations()
        undo_locations()
        undo_users()
    seed_users()
    seed_locations()
    seed_user_locations()
    seed_businesses()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_businesses()
    undo_user_locations()
    undo_locations()
    undo_users()
