import random
from app.models import db, UserLocation, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_locations():
    print("\nSeeding user_locations table...")
    for user_id in list(range(1, 51)):
        for _ in list(range(3)):
            location_id = random.choice(list(range(1, 51)))

            new_user_location = UserLocation(
                user_id=user_id,
                location_id=location_id,
            )
            db.session.add(new_user_location)

    db.session.commit()
    print("User_locations table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_locations"))

    db.session.commit()
