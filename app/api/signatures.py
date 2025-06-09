from flask import Blueprint, request, jsonify
from app.models import Signature, db
from datetime import datetime, timedelta

signature_routes = Blueprint('signatures', __name__)

@signature_routes.route('/', methods=['GET'])
def get_signatures():
    """Get all signatures"""
    signatures = Signature.query.order_by(Signature.created_at.desc()).limit(100).all()
    return {'signatures': [signature.to_dict() for signature in signatures]}

@signature_routes.route('/', methods=['POST'])
def create_signature():
    """Create a new signature"""
    data = request.get_json()

    # Basic validation
    if not data.get('name') or not data.get('message'):
        return {'error': 'Name and message are required'}, 400

    if len(data.get('name', '')) > 50:
        return {'error': 'Name must be 50 characters or less'}, 400

    if len(data.get('message', '')) > 200:
        return {'error': 'Message must be 200 characters or less'}, 400

    # Rate limiting - prevent spam (optional)
    recent_signatures = Signature.query.filter(
        Signature.created_at > datetime.utcnow() - timedelta(minutes=5)
    ).count()

    if recent_signatures > 10:
        return {'error': 'Too many signatures recently. Please wait.'}, 429

    signature = Signature(
        name=data['name'].strip(),
        message=data['message'].strip(),
        color=data.get('color', '#ffffff')
    )

    db.session.add(signature)
    db.session.commit()

    return signature.to_dict(), 201
