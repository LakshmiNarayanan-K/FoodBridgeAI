import { useEffect, useMemo, useState } from "react";
import "./NGOs.css";

type Donation = {
  id: number;
  food_name: string;
  description?: string;
  quantity: string;
  location: string;
  expiry_time: string;
  donor_name: string;
  status: string;
  food_image?: string;
  created_at?: string;
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85",
];

export default function NGOs() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [accepting, setAccepting] = useState<number | null>(null);

  const loadDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/food/all");
      const data = await response.json();
      if (data.success) setDonations(data.foods || []);
      else setMessage(data.message || "Unable to load donations.");
    } catch {
      setMessage("Backend unavailable. Start the Flask server and refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDonations(); }, []);

  const available = useMemo(
    () => donations.filter((item) => item.status.toLowerCase() === "available"),
    [donations]
  );

  const acceptDonation = async (id: number) => {
    setAccepting(id);
    setMessage("");
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/food/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Reserved" }),
      });
      const data = await response.json();
      if (data.success) {
        setDonations((current) => current.map((item) => item.id === id ? data.food : item));
        setMessage("Donation accepted and reserved successfully.");
      } else setMessage(data.message || "Could not accept donation.");
    } catch {
      setMessage("Could not connect to the backend.");
    } finally {
      setAccepting(null);
    }
  };

  return (
    <main className="ngo-command-page">
      <section className="ngo-hero">
        <div>
          <span className="ngo-eyebrow">FOODBRIDGE AI • NGO COMMAND CENTER</span>
          <h1>Available Food</h1>
          <p>Discover surplus food nearby and reserve donations for your community.</p>
        </div>
        <div className="ngo-hero-mark">✦</div>
      </section>

      <section className="ngo-summary">
        <div><strong>{available.length}</strong><span>Available donations</span></div>
        <div><strong>{donations.length}</strong><span>Network donations</span></div>
        <div><strong>LIVE</strong><span>Donation feed</span></div>
      </section>

      <div className="ngo-toolbar">
        <div>
          <span>LIVE FOOD NETWORK</span>
          <h2>Donations ready for redistribution</h2>
        </div>
        <button onClick={loadDonations} disabled={loading}>{loading ? "Refreshing..." : "↻ Refresh"}</button>
      </div>

      {message && <div className="ngo-message">{message}</div>}

      {loading ? (
        <div className="ngo-empty">Loading available food...</div>
      ) : available.length === 0 ? (
        <div className="ngo-empty"><span>🍽️</span><h3>No available donations</h3><p>New donor submissions will appear here automatically.</p></div>
      ) : (
        <section className="ngo-grid">
          {available.map((donation, index) => (
            <article className="ngo-food-card" key={donation.id}>
              <div className="ngo-food-image">
                <img src={donation.food_image || fallbackImages[index % fallbackImages.length]} alt={donation.food_name} />
                <span className="available-badge">● AVAILABLE</span>
              </div>
              <div className="ngo-food-content">
                <div className="ngo-card-top"><span>FD{String(donation.id).padStart(4, "0")}</span><span>Fresh supply</span></div>
                <h3>{donation.food_name}</h3>
                <p className="ngo-quantity">{donation.quantity}</p>
                <p className="ngo-description">{donation.description || "Fresh surplus food ready for community redistribution."}</p>
                <div className="ngo-meta"><span>📍 {donation.location}</span><span>⏱ Expires {donation.expiry_time}</span></div>
                <div className="ngo-donor">Donated by <strong>{donation.donor_name}</strong></div>
                <button className="accept-button" onClick={() => acceptDonation(donation.id)} disabled={accepting === donation.id}>
                  {accepting === donation.id ? "Accepting..." : "✓ Accept Donation"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
