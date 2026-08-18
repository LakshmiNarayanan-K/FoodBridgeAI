# FoodBridge AI

FoodBridge AI connects food donors, NGOs, and delivery partners through a live donation workflow.

## Delivery workflow

1. A donor creates a food donation.
2. An NGO accepts the donation and assigns a delivery partner.
3. FoodBridge generates a unique QR tracking link.
4. The receiver gets an email when the donation is accepted.
5. The receiver gets another email whenever the delivery status changes: Reserved, Picked Up, On The Way, or Delivered.
6. The QR opens `/tracking/:id`, where the status refreshes automatically.

## Email notifications

The backend uses standard SMTP, so no Telegram bot is required.

Copy the example values into `backend/.env` and configure:

```env
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=your-email@gmail.com
EMAIL_SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
PUBLIC_APP_URL=http://localhost:5173
```

For Gmail, use a Google App Password rather than your normal Gmail password. Keep `.env` out of Git and never commit the real SMTP password.

## Local run

Backend:

```powershell
cd backend
python app.py
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

The default local URLs are:

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:5000`
- Tracking: `http://localhost:5173/tracking/<donation-id>`
