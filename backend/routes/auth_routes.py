from flask import Blueprint

from controllers.auth_controller import (
    register,
    login,
    get_current_user,
    update_profile,
    change_password
)

auth_bp = Blueprint("auth", __name__)

# ==========================
# Authentication Routes
# ==========================

auth_bp.route("/register", methods=["POST"])(register)

auth_bp.route("/login", methods=["POST"])(login)

auth_bp.route("/me", methods=["GET"])(get_current_user)

auth_bp.route("/update-profile", methods=["PUT"])(update_profile)

auth_bp.route("/change-password", methods=["PUT"])(change_password)