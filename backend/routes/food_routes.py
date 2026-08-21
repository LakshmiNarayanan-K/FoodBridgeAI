from flask import Blueprint

from controllers.food_controller import (
    donate_food,
    get_all_food,
    get_my_food,
    get_food,
    delete_food,
    update_status,
    assign_delivery,
    add_review,
    get_notifications,
)

food_bp = Blueprint("food", __name__)

food_bp.route("/donate", methods=["POST"])(donate_food)
food_bp.route("/all", methods=["GET"])(get_all_food)
food_bp.route("/my", methods=["GET"])(get_my_food)
food_bp.route("/notifications", methods=["GET"])(get_notifications)
food_bp.route("/<int:food_id>", methods=["GET"])(get_food)
food_bp.route("/delete/<int:food_id>", methods=["DELETE"])(delete_food)
food_bp.route("/status/<int:food_id>", methods=["PUT"])(update_status)
food_bp.route("/assign/<int:food_id>", methods=["PUT"])(assign_delivery)
food_bp.route("/review/<int:food_id>", methods=["PUT"])(add_review)
