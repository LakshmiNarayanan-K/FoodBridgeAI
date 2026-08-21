from datetime import datetime
from uuid import uuid4

from flask import request, jsonify

from extensions import db
from models.food import Food
from services.email_service import send_status_email


ALLOWED_STATUSES = {"Available", "Accepted", "Reserved", "Picked Up", "On The Way", "Delivered", "Cancelled"}


def _relative_time(value):
    if not value:
        return "Recently"
    seconds = max(0, int((datetime.utcnow() - value).total_seconds()))
    if seconds < 60:
        return "Just now"
    if seconds < 3600:
        minutes = seconds // 60
        return f"{minutes} min ago"
    if seconds < 86400:
        hours = seconds // 3600
        return f"{hours} hr ago"
    days = seconds // 86400
    return f"{days} day{'s' if days != 1 else ''} ago"


def _notification_for_food(food, email):
    is_donor = (food.donor_email or "").lower() == email.lower()
    is_receiver = (food.receiver_email or "").lower() == email.lower()
    if not (is_donor or is_receiver):
        return None

    status = food.status
    order_id = f"FD{food.id:04d}"
    tracking = f"/tracking/{food.id}" if status in {"Accepted", "Reserved", "Picked Up", "On The Way", "Delivered"} else None

    if is_donor and status == "Available":
        title = "Donation published"
        description = f"{food.food_name} ({food.quantity}) is now available to NGO partners."
        tone = "new"
    elif status == "Accepted":
        title = "Donation accepted"
        description = f"An NGO accepted {order_id}. Delivery coordination is now active."
        tone = "accepted"
    elif status == "Reserved":
        title = "Donation reserved"
        description = f"{order_id} has been reserved and is being prepared for pickup."
        tone = "reserved"
    elif status == "Picked Up":
        title = "Food picked up"
        description = f"{order_id} has been collected by the delivery partner."
        tone = "route"
    elif status == "On The Way":
        title = "Food is on the way"
        description = f"{food.food_name} is travelling to the receiver. Track the live delivery from FoodBridge."
        tone = "route"
    elif status == "Delivered":
        title = "Delivery completed"
        description = f"{order_id} was delivered successfully. Thank you for reducing food waste!"
        tone = "done"
    elif status == "Cancelled":
        title = "Donation cancelled"
        description = f"{order_id} has been cancelled. Please contact the NGO for details."
        tone = "info"
    else:
        title = "FoodBridge update"
        description = f"{order_id} is currently marked as {status}."
        tone = "info"

    return {
        "id": f"{order_id}-{status.replace(' ', '-').lower()}",
        "title": title,
        "description": description,
        "time": _relative_time(food.updated_at or food.created_at),
        "type": tone,
        "foodId": food.id,
        "status": status,
        "trackingUrl": tracking,
    }


def get_notifications():
    email = (request.args.get("email") or "").strip()
    if not email:
        return jsonify({"success": False, "message": "Email is required."}), 400

    foods = Food.query.order_by(Food.updated_at.desc(), Food.created_at.desc()).all()
    notifications = []
    for food in foods:
        item = _notification_for_food(food, email)
        if item:
            notifications.append(item)

    return jsonify({
        "success": True,
        "count": len(notifications),
        "notifications": notifications[:30],
    })


def donate_food():
    data = request.get_json() or {}

    required = ["food_name", "quantity", "location", "expiry_time", "donor_name", "donor_email"]
    if not all(data.get(field) for field in required):
        return jsonify({"success": False, "message": "All required fields must be filled."}), 400

    food = Food(
        food_name=data.get("food_name"),
        description=data.get("description"),
        quantity=data.get("quantity"),
        location=data.get("location"),
        expiry_time=data.get("expiry_time"),
        donor_name=data.get("donor_name"),
        donor_email=data.get("donor_email"),
        food_image=data.get("food_image"),
        status="Available",
    )
    db.session.add(food)
    db.session.commit()

    return jsonify({"success": True, "message": "Donation created successfully.", "food": food.to_dict()}), 201


def get_all_food():
    foods = Food.query.order_by(Food.created_at.desc()).all()
    return jsonify({"success": True, "count": len(foods), "foods": [food.to_dict() for food in foods]})


def get_my_food():
    email = request.args.get("email")
    if not email:
        return jsonify({"success": False, "message": "Email is required."}), 400
    foods = Food.query.filter_by(donor_email=email).order_by(Food.created_at.desc()).all()
    return jsonify({"success": True, "foods": [food.to_dict() for food in foods]})


def get_food(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404
    return jsonify({"success": True, "food": food.to_dict()})


def delete_food(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404
    db.session.delete(food)
    db.session.commit()
    return jsonify({"success": True, "message": "Donation deleted successfully."})


def update_status(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404

    data = request.get_json() or {}
    status = data.get("status")
    if status not in ALLOWED_STATUSES:
        return jsonify({"success": False, "message": "Invalid donation status."}), 400

    previous_status = food.status
    food.status = status
    if data.get("delivery_person_name"):
        food.delivery_person_name = data.get("delivery_person_name")

    db.session.commit()

    email_sent = False
    if status != previous_status and food.receiver_email:
        email_sent = send_status_email(food, status)

    return jsonify({
        "success": True,
        "message": "Status updated successfully." if not email_sent else "Status updated and email notification sent.",
        "email_sent": email_sent,
        "food": food.to_dict(),
    })


def assign_delivery(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404

    data = request.get_json() or {}
    status = data.get("status", "Accepted")
    if status not in ALLOWED_STATUSES:
        return jsonify({"success": False, "message": "Invalid delivery status."}), 400

    food.ngo_name = data.get("ngo_name", food.ngo_name)
    food.receiver_name = data.get("receiver_name", food.receiver_name)
    food.receiver_email = data.get("receiver_email", food.receiver_email)
    food.delivery_person_name = data.get("delivery_person_name", food.delivery_person_name)
    food.status = status
    food.accepted_at = datetime.utcnow()
    food.delivery_qr_token = food.delivery_qr_token or uuid4().hex

    db.session.commit()

    email_sent = bool(food.receiver_email and send_status_email(food, food.status))
    if email_sent:
        message = "Delivery assigned, QR activated and email notification sent."
    elif food.receiver_email:
        message = "Delivery assigned and QR activated, but email could not be sent. Check SMTP settings."
    else:
        message = "Delivery assigned and QR activated. Add a receiver email to enable notifications."

    return jsonify({
        "success": True,
        "message": message,
        "email_sent": email_sent,
        "food": food.to_dict(),
    }), 200


def add_review(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404

    data = request.get_json() or {}
    food.receiver_name = data.get("receiver_name")
    food.receiver_rating = data.get("receiver_rating")
    food.receiver_review = data.get("receiver_review")
    food.ngo_name = data.get("ngo_name")
    db.session.commit()

    return jsonify({"success": True, "message": "Review added successfully.", "food": food.to_dict()})
