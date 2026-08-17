from datetime import datetime
from extensions import db


class Food(db.Model):
    __tablename__ = "foods"

    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    expiry_time = db.Column(db.String(100), nullable=False)

    donor_name = db.Column(db.String(100), nullable=False)
    donor_email = db.Column(db.String(120), nullable=False)
    food_image = db.Column(db.String(300), nullable=True)

    status = db.Column(db.String(30), default="Available")

    ngo_name = db.Column(db.String(120), nullable=True)
    receiver_name = db.Column(db.String(120), nullable=True)
    receiver_telegram_chat_id = db.Column(db.String(100), nullable=True)
    delivery_person_name = db.Column(db.String(120), nullable=True)
    delivery_qr_token = db.Column(db.String(120), nullable=True, unique=True)
    accepted_at = db.Column(db.DateTime, nullable=True)

    receiver_rating = db.Column(db.Integer, nullable=True)
    receiver_review = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "food_name": self.food_name,
            "description": self.description,
            "quantity": self.quantity,
            "location": self.location,
            "expiry_time": self.expiry_time,
            "donor_name": self.donor_name,
            "donor_email": self.donor_email,
            "food_image": self.food_image,
            "status": self.status,
            "ngo_name": self.ngo_name,
            "receiver_name": self.receiver_name,
            "receiver_telegram_chat_id": self.receiver_telegram_chat_id,
            "delivery_person_name": self.delivery_person_name,
            "delivery_qr_token": self.delivery_qr_token,
            "accepted_at": self.accepted_at.strftime("%d-%m-%Y %H:%M") if self.accepted_at else None,
            "receiver_rating": self.receiver_rating,
            "receiver_review": self.receiver_review,
            "created_at": self.created_at.strftime("%d-%m-%Y %H:%M") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%d-%m-%Y %H:%M") if self.updated_at else None,
        }
