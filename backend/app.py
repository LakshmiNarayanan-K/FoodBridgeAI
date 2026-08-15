from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from extensions import db, jwt, bcrypt

# Import Models
from models.user import User
from models.food import Food

# Import Routes
from routes.auth_routes import auth_bp
from routes.food_routes import food_bp


app = Flask(__name__)
app.config.from_object(Config)

# Initialize Extensions
db.init_app(app)
jwt.init_app(app)
bcrypt.init_app(app)

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(food_bp, url_prefix="/api/food")


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "🚀 Welcome to FoodBridge AI Backend"
    })


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )