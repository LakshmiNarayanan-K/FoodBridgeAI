from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models.user import User


# =====================================================
# REGISTER
# =====================================================

def register():

    data = request.get_json()
    print("REGISTER DATA:", data)

    

    full_name = data.get("full_name") or data.get("fullName")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    role = data.get("role") or data.get("userType") or "donor"

    if not full_name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Full name, email and password are required."
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    new_user = User(
        full_name=full_name,
        email=email,
        phone=phone,
        role=role
    )

    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User registered successfully.",
        "user": new_user.to_dict()
    }), 201


# =====================================================
# LOGIN
# =====================================================

def login():

    data = request.get_json()

    print("LOGIN DATA:", data)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    if not user.check_password(password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "email": user.email,
            "role": user.role
        }
    )

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200


# =====================================================
# CURRENT USER
# =====================================================

@jwt_required()
def get_current_user():

    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    return jsonify({
        "success": True,
        "user": user.to_dict()
    })


# =====================================================
# UPDATE PROFILE
# =====================================================

@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    user.full_name = data.get("full_name") or data.get("fullName") or user.full_name
    user.phone = data.get("phone", user.phone)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Profile updated successfully.",
        "user": user.to_dict()
    })


# =====================================================
# CHANGE PASSWORD
# =====================================================

@jwt_required()
def change_password():

    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not user.check_password(current_password):
        return jsonify({
            "success": False,
            "message": "Current password is incorrect."
        }), 401

    user.set_password(new_password)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Password changed successfully."
    })