# 🍱 FoodBridge AI

> A full-stack platform connecting food donors, NGOs, delivery partners, and receivers through a trackable food-donation workflow.

## 🎯 Problem

Food donations can become difficult to coordinate when donors, NGOs, delivery partners, and receivers do not have a shared workflow. FoodBridge AI provides a centralized system for creating, accepting, delivering, and tracking donations.

## ✨ Key Features

- 👤 Donor → NGO → delivery partner workflow
- 📦 Food donation creation and acceptance
- 🚚 Delivery status tracking
- 🔗 Unique QR-based donation tracking
- 📧 Email notifications for acceptance and delivery updates
- 🔄 Live tracking page with automatic status refresh
- 🌐 React-based frontend with a Flask backend

## 🔄 Delivery Workflow

```text
Donor creates donation
        ↓
NGO accepts donation
        ↓
Delivery partner assigned
        ↓
Unique QR tracking link generated
        ↓
Donation picked up
        ↓
On the way
        ↓
Delivered
```

## 🧰 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- React Leaflet
- Recharts

### Backend
- Python
- Flask
- REST API
- SMTP email notifications

### Other
- QR-based tracking
- Environment-based configuration
- Git/GitHub

## 📂 Project Structure

```text
FoodBridgeAI/
├── backend/          # Flask API and backend services
├── frontend/         # React + TypeScript application
├── README.md
└── ...
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/LakshmiNarayanan-K/FoodBridgeAI.git
cd FoodBridgeAI
```

### 2. Configure the backend

Create `backend/.env` using the required environment variables:

```env
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=your-email@gmail.com
EMAIL_SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
PUBLIC_APP_URL=http://localhost:5173
```

**Never commit real credentials or `.env` files.** For Gmail, use an App Password rather than your normal account password.

### 3. Start the backend

```powershell
cd backend
python app.py
```

### 4. Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

### Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:5000`
- Tracking: `http://localhost:5173/tracking/<donation-id>`

## 📌 Project Status

This project is being developed as a practical full-stack application with an emphasis on real-world donation logistics, tracking, and communication.

## 🔮 Future Improvements

- Production deployment
- Automated testing and CI
- Role-based analytics dashboards
- Improved delivery optimization
- Stronger authentication and security controls
- Cloud-based monitoring and observability

## 👨‍💻 Author

**Lakshmi Narayanan K**  
Computer Science Engineering Student  
Interests: Cybersecurity • AI/ML • Software Engineering • IoT

---

⭐ If you find the project useful, consider starring the repository.