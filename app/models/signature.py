from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Signature(db.Model):
    __tablename__ = 'signatures'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    color = db.Column(db.String(7), default='#ffffff')  # hex color
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'message': self.message,
            'color': self.color,
            'created_at': self.created_at.isoformat()
        }
