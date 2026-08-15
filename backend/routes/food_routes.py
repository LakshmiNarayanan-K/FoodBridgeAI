from flask import Blueprint

from controllers.food_controller import (
    donate_food,
    get_all_food,
    get_my_food,
    delete_food,
    update_status,
    add_review
)

food_bp = Blueprint("food", __name__)

# Donate Food
food_bp.route("/donate", methods=["POST"])(donate_food)

# Get All Donations
food_bp.route("/all", methods=["GET"])(get_all_food)

# Get My Donations
food_bp.route("/my", methods=["GET"])(get_my_food)

# Delete Donation
food_bp.route("/delete/<int:food_id>", methods=["DELETE"])(delete_food)

# Update Status
food_bp.route("/status/<int:food_id>", methods=["PUT"])(update_status)

# Add Receiver Review
food_bp.route("/review/<int:food_id>", methods=["PUT"])(add_review)