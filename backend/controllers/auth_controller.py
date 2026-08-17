from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from extensions import db
from models.user import User
from models.ngo import NGOProfile


def register():
    data = request.get_json() or {}
    print("REGISTER DATA:", data)

    full_name = data.get("full_name") or data.get("fullName")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    role = (data.get("role") or data.get("userType") or "donor").lower()

    if role not in {"donor", "ngo"}:
        return jsonify({"success": False, "message": "Invalid account type."}), 400

    if not full_name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Full name, email and password are required."
        }), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"success": False, "message": "Email already exists."}), 409

    if role == "ngo":
        organization_name = data.get("organization_name") or data.get("organizationName")
        registration_id = data.get("registration_id") or data.get("registrationId")
        service_area = data.get("service_area") or data.get("serviceArea")
        address = data.get("address")
        website = data.get("website")
        description = data.get("description")

        if not organization_name or not registration_id or not service_area or not address:
            return jsonify({
                "success": False,
                "message": "NGO name, registration ID, service area and address are required."
            }), 400

    new_user = User(
        full_name=full_name,
        email=email,
        phone=phone,
        role=role
    )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.flush()

    if role == "ngo":
        profile = NGOProfile(
            user_id=new_user.id,
            organization_name=organization_name,
            registration_id=registration_id,
            service_area=service_area,
            address=address,
            website=website,
            description=description,
        )
        db.session.add(profile)

    db.session.commit()

    result = {"success": True, "message": "Registration successful.", "user": new_user.to_dict()}
    if role == "ngo":
        result["ngo_profile"] = profile.to_dict()

    return jsonify(result), 201


def login():
    data = request.get_json() or {}
    print("LOGIN DATA:", data)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={"email": user.email, "role": user.role}
    )

    result = {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "user": user.to_dict()
    }

    if user.role == "ngo":
        profile = NGOProfile.query.filter_by(user_id=user.id).first()
        result["ngo_profile"] = profile.to_dict() if profile else None

    return jsonify(result), 200


@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    result = {"success": True, "user": user.to_dict()}
    if user.role == "ngo":
        profile = NGOProfile.query.filter_by(user_id=user.id).first()
        result["ngo_profile"] = profile.to_dict() if profile else None

    return jsonify(result)


@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    data = request.get_json() or {}
    user.full_name = data.get("full_name") or data.get("fullName") or user.full_name
    user.phone = data.get("phone", user.phone)
    db.session.commit()

    return jsonify({"success": True, "message": "Profile updated successfully.", "user": user.to_dict()})


@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    data = request.get_json() or {}
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not user.check_password(current_password):
        return jsonify({"success": False, "message": "Current password is incorrect."}), 401

    user.set_password(new_password)
    db.session.commit()
    return jsonify({"success": True, "message": "Password changed successfully."})
