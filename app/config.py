import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Get DATABASE_URL from environment or fallback
    db_url = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')

    # Fix Heroku's postgres:// → postgresql://
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = db_url
    SQLALCHEMY_ECHO = True
