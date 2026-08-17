import json
import os
import threading
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from models.food import Food

_active_orders = set()
_lock = threading.Lock()

STATUS_MESSAGES = {
    "Accepted": "🟢 Your FoodBridge order has been accepted by the NGO. A delivery partner will be assigned soon.",
    "Reserved": "📦 Your FoodBridge order is reserved and being prepared for pickup.",
    "Picked Up": "🚚 Your FoodBridge order has been picked up by the delivery partner.",
    "On The Way": "📍 Your FoodBridge order is on the way and should arrive soon.",
    "Delivered": "✅ Your FoodBridge order has been delivered successfully. Thank you for helping reduce food waste! 🌱",
    "Cancelled": "❌ Your FoodBridge order has been cancelled. Please contact the NGO for more information.",
}


def send_telegram_message(chat_id, text):
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = urlencode({"chat_id": chat_id, "text": text}).encode("utf-8")
    request = Request(url, data=payload, method="POST")

    try:
        with urlopen(request, timeout=10) as response:
            result = json.loads(response.read().decode("utf-8"))
            return bool(result.get("ok"))
    except Exception as exc:
        print(f"Telegram notification failed: {exc}")
        return False


def send_status_notification(food, status=None):
    status = status or food.status
    chat_id = food.receiver_telegram_chat_id
    if not chat_id:
        return False

    message = STATUS_MESSAGES.get(status, f"FoodBridge update: your order status is now {status}.")
    message += f"\nOrder: FD{food.id:04d}\nStatus: {status}"
    if food.delivery_person_name:
        message += f"\nDelivery partner: {food.delivery_person_name}"
    if food.location:
        message += f"\nPickup: {food.location}"
    return send_telegram_message(chat_id, message)


def start_order_notifications(app, food_id):
    with _lock:
        if food_id in _active_orders:
            return
        _active_orders.add(food_id)

    thread = threading.Thread(
        target=_notification_loop,
        args=(app, food_id),
        daemon=True,
        name=f"foodbridge-telegram-{food_id}",
    )
    thread.start()


def _notification_loop(app, food_id):
    try:
        while True:
            with app.app_context():
                food = Food.query.get(food_id)
                if not food or food.status in {"Delivered", "Cancelled"}:
                    break

                # Swiggy-style arrival reminders are intentionally limited to
                # the active delivery stage, so the receiver is not spammed
                # with repeated Accepted/Picked Up messages.
                if food.status == "On The Way":
                    send_status_notification(food, "On The Way")

            time.sleep(60)
    finally:
        with _lock:
            _active_orders.discard(food_id)
