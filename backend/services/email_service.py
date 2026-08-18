import os
import smtplib
from email.message import EmailMessage
from urllib.parse import quote


STATUS_COPY = {
    "Accepted": ("Donation accepted", "Your FoodBridge donation has been accepted by the NGO."),
    "Reserved": ("Donation reserved", "Your FoodBridge donation is reserved and being prepared for pickup."),
    "Picked Up": ("Food picked up", "Your FoodBridge donation has been picked up by the delivery partner."),
    "On The Way": ("Food is on the way", "Your FoodBridge donation is on the way and should arrive soon."),
    "Delivered": ("Food delivered", "Your FoodBridge donation has been delivered successfully. Thank you for helping reduce food waste!"),
    "Cancelled": ("Donation cancelled", "Your FoodBridge donation has been cancelled. Please contact the NGO for more information."),
}


def _tracking_url(food):
    base = os.getenv("PUBLIC_APP_URL", "http://localhost:5173").rstrip("/")
    return f"{base}/tracking/{food.id}"


def send_email(to_email, subject, body):
    host = os.getenv("EMAIL_SMTP_HOST")
    username = os.getenv("EMAIL_SMTP_USERNAME")
    password = os.getenv("EMAIL_SMTP_PASSWORD")
    port = int(os.getenv("EMAIL_SMTP_PORT", "587"))
    sender = os.getenv("EMAIL_FROM", username or "no-reply@foodbridge.local")

    if not all([host, username, password, to_email]):
        print("Email notification skipped: SMTP configuration or receiver email is missing.")
        return False

    message = EmailMessage()
    message["From"] = sender
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)

    try:
        with smtplib.SMTP(host, port, timeout=15) as server:
            server.starttls()
            server.login(username, password)
            server.send_message(message)
        return True
    except Exception as exc:
        print(f"Email notification failed: {exc}")
        return False


def send_status_email(food, status=None):
    status = status or food.status
    to_email = food.receiver_email
    if not to_email:
        return False

    title, message = STATUS_COPY.get(status, ("FoodBridge update", f"Your order status is now {status}."))
    order_id = f"FD{food.id:04d}"
    tracking = _tracking_url(food)
    body = (
        f"Hello {food.receiver_name or 'FoodBridge user'},\n\n"
        f"{message}\n\n"
        f"Order: {order_id}\n"
        f"Food: {food.food_name}\n"
        f"Quantity: {food.quantity}\n"
        f"Status: {status}\n"
    )
    if food.delivery_person_name:
        body += f"Delivery partner: {food.delivery_person_name}\n"
    if food.location:
        body += f"Pickup location: {food.location}\n"
    body += f"\nLive tracking: {tracking}\n\nFoodBridge AI"

    return send_email(to_email, f"FoodBridge · {title} · {order_id}", body)
