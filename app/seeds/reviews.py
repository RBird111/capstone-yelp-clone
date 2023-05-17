import json
from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    data = open('app/seeds/data/reviews.json')
    reviews = json.load(data)

    print("\nSeeding reviews table...")
    for review in reviews:
        new_user = Review(
            rating=review['rating'],
            body=review['body'],
            user_id=review['user_id'],
            business_id=review['business_id'],
        )
        db.session.add(new_user)

    db.session.commit()
    print("Reviews table seeded.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            f"TRUNCATE table reviews RESTART IDENTITY CASCADE;")

    db.session.commit()
