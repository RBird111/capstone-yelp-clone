import json
import random
from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_images():
    data = open('app/seeds/data/images.json')
    images = json.load(data)

    print("\nSeeding images table...")
    for image in images:
        var = random.choice(list(range(1, 101)))
        if var < 34:
            new_image = Image(
                url=image['url'],
                user_id=random.choice(range(1, 51)),
                business_id=random.choice(range(1, 31)),
                review_id=None,
            )
            db.session.add(new_image)
        else:
            new_image = Image(
                url=image['url'],
                user_id=random.choice(range(1, 51)),
                review_id=random.choice(range(1, 151)),
                business_id=None,
            )
            db.session.add(new_image)

    db.session.commit()
    print("Images table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
