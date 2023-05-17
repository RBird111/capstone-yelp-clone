import json
from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    data = open('app/seeds/data/users.json')
    users = json.load(data)

    print("\nSeeding users table...")
    for user in users:
        new_user = User(
            first_name=user['first_name'],
            last_name=user['last_name'],
            username=user['username'],
            email=user['email'],
            password='password',
        )
        db.session.add(new_user)

    db.session.commit()
    print("Users table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            f"TRUNCATE table users RESTART IDENTITY CASCADE;")

    db.session.commit()
