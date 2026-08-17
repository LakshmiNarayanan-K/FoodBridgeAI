from datetime import datetime
from uuid import uuid4

from flask import request, jsonify, current_app

from extensions import db
from models.food import Food
from services.telegram_service import start_order_notifications


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
    allowed = {"Available", "Accepted", "Reserved", "Picked Up", "On The Way", "Delivered", "Cancelled"}
    if status not in allowed:
        return jsonify({"success": False, "message": "Invalid donation status."}), 400

    food.status = status
    if status == "Delivered":
        food.delivery_person_name = data.get("delivery_person_name", food.delivery_person_name)

    db.session.commit()

    if status in {"Accepted", "Reserved", "Picked Up", "On The Way"} and food.receiver_telegram_chat_id:
        start_order_notifications(current_app._get_current_object(), food.id)

    return jsonify({"success": True, "message": "Status updated successfully.", "food": food.to_dict()})


def assign_delivery(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"success": False, "message": "Donation not found."}), 404

    data = request.get_json() or {}
    food.ngo_name = data.get("ngo_name", food.ngo_name)
    food.receiver_name = data.get("receiver_name", food.receiver_name)
    food.receiver_telegram_chat_id = data.get("telegram_chat_id", food.receiver_telegram_chat_id)
    food.delivery_person_name = data.get("delivery_person_name", food.delivery_person_name)
    food.status = data.get("status", "Accepted")
    food.accepted_at = datetime.utcnow()
    food.delivery_qr_token = food.delivery_qr_token or uuid4().hex

    db.session.commit()

    if food.receiver_telegram_chat_id:
        start_order_notifications(current_app._get_current_object(), food.id)

    return jsonify({"success": True, "message": "Delivery assigned and QR activated.", "food": food.to_dict()}), 200


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
