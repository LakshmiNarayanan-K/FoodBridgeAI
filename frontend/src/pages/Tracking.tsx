import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./Tracking.css";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { getFoodImage } from "../utils/foodImages";

type Food = { id: number; food_name: string; location: string; status: string; delivery_person_name?: string | null; quantity: string; food_image?: string | null; ngo_name?: string | null; receiver_name?: string | null; receiver_email?: string | null };
const steps = ["Accepted", "Reserved", "Picked Up", "On The Way", "Delivered"];

export default function Tracking() {
  const { id } = useParams();
  const [food, setFood] = useState<Food | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;
    const load = () => fetch(`http://127.0.0.1:5000/api/food/${Number(id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data.success) { setFood(data.food); setError(""); } else setError(data.message || "Donation not found.");
      })
      .catch(() => active && setError("Unable to reach FoodBridge right now."));
    load();
    const timer = window.setInterval(load, 10000);
    return () => { active = false; window.clearInterval(timer); };
  }, [id]);

  const image = useMemo(() => food ? (food.food_image || getFoodImage(food.food_name)) : "", [food]);
  const current = food ? steps.indexOf(food.status) : 0;
  const progress = food?.status === "Delivered" ? 100 : Math.max(4, Math.min(100, ((Math.max(current, 0) + 1) / steps.length) * 100));

  return (
    <div className="tracking-container">
      <div className="tracking-shell">
        <header className="tracking-header"><div><span>FOODBRIDGE AI</span><h1>Live delivery tracking</h1></div><div className="live-indicator"><i /> LIVE</div></header>
        <div className="tracking-card">
          {error ? <div className="tracking-error">{error}</div> : <>
            {image && <img className="tracking-food-image" src={image} alt={food?.food_name || "Food donation"} />}
            <div className="tracking-order-head"><div><span className="tracking-label">DONATION ID</span><h2>FD{String(food?.id || id || "").padStart(4, "0")}</h2>{food && <p><b>{food.food_name}</b> · {food.quantity}</p>}</div><span className={`tracking-status ${food?.status === "Delivered" ? "delivered" : ""}`}>{food?.status || "Loading"}</span></div>
            {food && <div className="tracking-meta"><span>📍 {food.location}</span>{food.ngo_name && <span>🏢 {food.ngo_name}</span>}{food.delivery_person_name && <span>🚚 {food.delivery_person_name}</span>}</div>}
            <div className="progress-bar"><div className="progress" style={{ width: `${progress}%` }} /></div>
            <p className="eta">{food?.status === "Delivered" ? "Delivery completed" : food?.status === "On The Way" ? "Your food is on the way" : `Current status: ${food?.status || "Loading"}`}</p>
            <div className="timeline">{steps.map((step, index) => <div className={`step ${index < current || food?.status === "Delivered" ? "completed" : index === current ? "active" : ""}`} key={step}><span className="step-icon">{index < current || food?.status === "Delivered" ? <FaCheckCircle /> : index === 2 ? <FaBoxOpen /> : index === 3 ? <FaTruck /> : <FaMapMarkerAlt />}</span><span>{step}</span></div>)}</div>
            {food?.receiver_email && <div className="email-alert"><FaEnvelope /><div><strong>Email updates enabled</strong><span>Status updates are sent to {food.receiver_email}</span></div></div>}
            <small className="refresh-note">Live status refreshes automatically every 10 seconds.</small>
          </>}
        </div>
      </div>
    </div>
  );
}
