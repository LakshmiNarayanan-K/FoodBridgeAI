import { useMemo, useState } from "react";
import "./DonateFood.css";
import { getFoodImage } from "../utils/foodImages";

export default function DonateFood() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const foodImage = useMemo(() => (foodName.trim() ? getFoodImage(foodName) : ""), [foodName]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/food/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          food_name: foodName,
          quantity,
          location,
          expiry_time: expiryTime,
          description,
          food_image: foodImage,
          donor_name: user.full_name,
          donor_email: user.email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("🎉 Food Donated Successfully! Your donation is now waiting for NGO acceptance.");
        setFoodName(""); setQuantity(""); setLocation(""); setExpiryTime(""); setDescription("");
      } else alert(data.message);
    } catch { alert("Server Error"); }
    setLoading(false);
  };

  return (
    <div className="donate-page">
      <div className="donate-card">
        <div className="donate-intro-image">{foodImage ? <img src={foodImage} alt="Food preview" /> : <span>🍱</span>}</div>
        <h1 className="donate-title">🍽 Donate Food</h1>
        <p className="subtitle">Help reduce food waste by donating surplus food.</p>
        <div className="location-box">
          <h4>📍 Donor Information</h4>
          <p><b>Name:</b> {user.full_name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p className="donation-flow-note">After an NGO accepts your donation, FoodBridge activates a secure delivery QR and live tracking.</p>
        </div>
        <form onSubmit={handleDonate}>
          <div className="form-group"><label>Food Name</label><input type="text" placeholder="Eg. Idly, Rice, Biryani" value={foodName} onChange={(e) => setFoodName(e.target.value)} required /></div>
          <div className="form-group"><label>Quantity</label><input type="text" placeholder="Eg. 50 Meals" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></div>
          <div className="form-group"><label>Pickup Location</label><input type="text" placeholder="Enter Complete Address" value={location} onChange={(e) => setLocation(e.target.value)} required /></div>
          <div className="form-group"><label>Expiry Time</label><input type="datetime-local" value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} required /></div>
          <div className="form-group"><label>Description</label><textarea rows={4} placeholder="Any additional information..." value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <button className="donate-btn" disabled={loading}>{loading ? "Donating..." : "🍱 Donate Food"}</button>
        </form>
      </div>
    </div>
  );
}
