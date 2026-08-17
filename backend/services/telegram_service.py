import json
import os
import threading
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from models.food import Food


_active_orders = set()
_lock = threading.Lock()


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
                if not food:
                    break

                if food.status in {"Delivered", "Cancelled"}:
                    break

                chat_id = food.receiver_telegram_chat_id
                if not chat_id:
                    break

                status_messages = {
                    "Accepted": "Your FoodBridge order has been accepted. A delivery partner will be assigned soon.",
                    "Reserved": "Your FoodBridge order is reserved and being prepared for pickup.",
                    "Picked Up": "Your FoodBridge order has been picked up. It is on its way to you.",
                    "On The Way": "🚚 FoodBridge update: your order is on the way and should arrive soon.",
                }
                message = status_messages.get(
                    food.status,
                    "FoodBridge update: your order is being processed."
                )
                message += f"\nOrder: FD{food.id:04d}\nStatus: {food.status}\nPickup: {food.location}"
                send_telegram_message(chat_id, message)

            time.sleep(60)
    finally:
        with _lock:
            _active_orders.discard(food_id)
