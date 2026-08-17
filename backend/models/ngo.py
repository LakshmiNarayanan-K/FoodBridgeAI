from datetime import datetime

from extensions import db


class NGOProfile(db.Model):
    __tablename__ = "ngo_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False)
    organization_name = db.Column(db.String(150), nullable=False)
    registration_id = db.Column(db.String(100), nullable=True)
    service_area = db.Column(db.String(150), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "organization_name": self.organization_name,
            "registration_id": self.registration_id,
            "service_area": self.service_area,
            "address": self.address,
            "website": self.website,
            "description": self.description,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
