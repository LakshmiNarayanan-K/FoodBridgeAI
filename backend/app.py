from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import inspect, text
from config import Config
from extensions import db, jwt, bcrypt
from models.user import User
from models.food import Food
from models.ngo import NGOProfile
from routes.auth_routes import auth_bp
from routes.food_routes import food_bp

app=Flask(__name__); app.config.from_object(Config); db.init_app(app); jwt.init_app(app); bcrypt.init_app(app); CORS(app)
app.register_blueprint(auth_bp,url_prefix="/api/auth"); app.register_blueprint(food_bp,url_prefix="/api/food")
@app.route("/")
def home(): return jsonify({"success":True,"message":"🚀 Welcome to FoodBridge AI Backend"})

def ensure_sqlite_columns():
    if not str(app.config.get("SQLALCHEMY_DATABASE_URI","" )).startswith("sqlite"): return
    inspector=inspect(db.engine)
    if "foods" not in inspector.get_table_names(): return
    existing={c["name"] for c in inspector.get_columns("foods")}
    additions={"receiver_email":"VARCHAR(120)","delivery_person_name":"VARCHAR(120)","delivery_qr_token":"VARCHAR(120)","accepted_at":"DATETIME"}
    with db.engine.begin() as connection:
        for name,definition in additions.items():
            if name not in existing: connection.execute(text(f"ALTER TABLE foods ADD COLUMN {name} {definition}"))

with app.app_context(): db.create_all(); ensure_sqlite_columns()
if __name__=="__main__": app.run(host="0.0.0.0",port=5000,debug=True)
