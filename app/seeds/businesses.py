import json
import random
from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_businesses():
    data = open('app/seeds/data/businesses.json')
    businesses = json.load(data)

    print("\nSeeding businesses table...")
    loc_arr = list(range(1, 51))
    user_arr = list(range(1, 51))
    for business in businesses:
        location = random.choice(loc_arr)
        loc_arr.remove(location)

        user = random.choice(user_arr)
        user_arr.remove(user)

        new_user = Business(
            name=business['name'],
            description=business['description'],
            category=business['category'],
            location_id=location,
            owner_id=user,
        )
        db.session.add(new_user)

    db.session.commit()
    print("Businesses table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            f"TRUNCATE table businesses RESTART IDENTITY CASCADE;")

    db.session.commit()
