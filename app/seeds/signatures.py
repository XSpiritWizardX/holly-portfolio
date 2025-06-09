from app.models import db, Signature, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_signatures():

    marnie = Signature(
        name='Marnie',
        message='Great work on this portfolio! Love the design and functionality.',
        color='#4ecdc4'
    )
    bobbie = Signature(
        name='Bobbie',
        message='Impressive coding skills! The maze game is so fun to play.',
        color='#45b7d1'
    )
    sarah = Signature(
        name='Sarah Chen',
        message='Your attention to detail is incredible. Keep up the great work!',
        color='#96ceb4'
    )
    alex = Signature(
        name='Alex Rodriguez',
        message='This portfolio really showcases your talent. Well done!',
        color='#ffeaa7'
    )
    jordan = Signature(
        name='Jordan Smith',
        message='Love the interactive elements! Very creative approach.',
        color='#dda0dd'
    )

    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sarah)
    db.session.add(alex)
    db.session.add(jordan)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the signatures table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_signatures():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.signatures RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM signatures"))
    db.session.commit()
