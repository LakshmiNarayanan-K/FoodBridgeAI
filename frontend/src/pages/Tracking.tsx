import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Tracking.css";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";

type Food = { id: number; food_name: string; location: string; status: string; delivery_person_name?: string | null; quantity: string; ngo_name?: string | null };
const steps = ["Accepted", "Reserved", "Picked Up", "On The Way", "Delivered"];

export default function Tracking() {
  const { id } = useParams();
  const [food, setFood] = useState<Food | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:5000/api/food/${Number(id)}`)
      .then((r) => r.json())
      .then((data) => data.success && setFood(data.food))
      .catch(() => {});
  }, [id]);

  const current = food ? steps.indexOf(food.status) : 0;
  const progress = Math.max(0, Math.min(100, ((current + 1) / steps.length) * 100));

  return (
    <div className="tracking-container">
      <h1>🚚 Live Donation Tracking</h1>
      <div className="tracking-card">
        <h2>Donation ID : {food ? `FD${String(food.id).padStart(4, "0")}` : `FD${String(id || "").padStart(4, "0")}`}</h2>
        {food ? <><p><b>{food.food_name}</b> · {food.quantity}</p><p>📍 {food.location}{food.ngo_name ? ` · ${food.ngo_name}` : ""}</p></> : <p>Loading live order details...</p>}
        <div className="progress-bar"><div className="progress" style={{ width: `${progress}%` }} /></div>
        <p className="eta">Status: <b>{food?.status || "Loading"}</b></p>
        {food?.delivery_person_name && <p className="eta">Delivery partner: <b>{food.delivery_person_name}</b></p>}
        <div className="timeline">
          {steps.map((step, index) => <div className={`step ${index < current ? "completed" : index === current ? "active" : ""}`} key={step}>{index < current ? <FaCheckCircle /> : index === 2 ? <FaBoxOpen /> : index === 3 ? <FaTruck /> : <FaMapMarkerAlt />}<span>{step}</span></div>)}
        </div>
      </div>
    </div>
  );
}
