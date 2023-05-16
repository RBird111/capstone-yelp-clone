import json
from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_locations():
    data = open('app/seeds/data/locations.json')
    locations = json.load(data)

    print("\nSeeding locations table...")
    for location in locations:
        new_location = Location(
            address=location['address'],
            city=location['city'],
            state=location['state'],
            lat=location['lat'],
            lng=location['lng'],
        )
        db.session.add(new_location)

    db.session.commit()
    print("Locations table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
