from flask import request, jsonify

from extensions import db
from models.food import Food


# =====================================================
# DONATE FOOD
# =====================================================

def donate_food():

    data = request.get_json()

    food_name = data.get("food_name")
    description = data.get("description")
    quantity = data.get("quantity")
    location = data.get("location")
    expiry_time = data.get("expiry_time")

    donor_name = data.get("donor_name")
    donor_email = data.get("donor_email")

    food_image = data.get("food_image")

    if not all([
        food_name,
        quantity,
        location,
        expiry_time,
        donor_name,
        donor_email
    ]):
        return jsonify({
            "success": False,
            "message": "All required fields must be filled."
        }), 400

    food = Food(
        food_name=food_name,
        description=description,
        quantity=quantity,
        location=location,
        expiry_time=expiry_time,

        donor_name=donor_name,
        donor_email=donor_email,

        food_image=food_image,

        status="Available"
    )

    db.session.add(food)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Donation created successfully.",
        "food": food.to_dict()
    }), 201


# =====================================================
# GET ALL DONATIONS
# =====================================================

def get_all_food():

    foods = Food.query.order_by(
        Food.created_at.desc()
    ).all()

    return jsonify({
        "success": True,
        "count": len(foods),
        "foods": [food.to_dict() for food in foods]
    })


# =====================================================
# GET MY DONATIONS
# =====================================================

def get_my_food():

    email = request.args.get("email")

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required."
        }), 400

    foods = Food.query.filter_by(
        donor_email=email
    ).order_by(
        Food.created_at.desc()
    ).all()

    return jsonify({
        "success": True,
        "foods": [food.to_dict() for food in foods]
    })


# =====================================================
# DELETE DONATION
# =====================================================

def delete_food(food_id):

    food = Food.query.get(food_id)

    if not food:
        return jsonify({
            "success": False,
            "message": "Donation not found."
        }), 404

    db.session.delete(food)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Donation deleted successfully."
    })


# =====================================================
# UPDATE DONATION STATUS
# =====================================================

def update_status(food_id):

    food = Food.query.get(food_id)

    if not food:
        return jsonify({
            "success": False,
            "message": "Donation not found."
        }), 404

    data = request.get_json()

    status = data.get("status")

    if status:
        food.status = status

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Status updated successfully.",
        "food": food.to_dict()
    })


# =====================================================
# ADD RECEIVER REVIEW
# =====================================================

def add_review(food_id):

    food = Food.query.get(food_id)

    if not food:
        return jsonify({
            "success": False,
            "message": "Donation not found."
        }), 404

    data = request.get_json()

    food.receiver_name = data.get("receiver_name")
    food.receiver_rating = data.get("receiver_rating")
    food.receiver_review = data.get("receiver_review")
    food.ngo_name = data.get("ngo_name")

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Review added successfully.",
        "food": food.to_dict()
    })