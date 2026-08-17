import { useEffect, useMemo, useState } from "react";
import DonationCard from "../components/donations/DonationCard";
import "./MyDonations.css";

type Status = "All" | "Available" | "Accepted" | "Reserved" | "Picked Up" | "On The Way" | "Delivered";
type DonationView = { id: string; food: string; quantity: string; location: string; status: string; date: string; latitude: number; longitude: number; image?: string; qrToken?: string | null };
type ApiFood = { id: number; food_name: string; quantity: string; location: string; status: string; created_at: string; food_image?: string | null; delivery_qr_token?: string | null };

const fallbackDonations: DonationView[] = [
  { id: "FD1001", food: "🍱 Idly & Sambar", quantity: "100 Meals", location: "Kundrathur, Chennai", status: "Available", date: "06 Aug 2026 | 09:30 AM", latitude: 13.0119, longitude: 80.153, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1002", food: "🍛 Veg Meals", quantity: "75 Meals", location: "Porur, Chennai", status: "Reserved", date: "06 Aug 2026 | 10:45 AM", latitude: 13.0358, longitude: 80.1561, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1003", food: "🥗 Fruits", quantity: "40 Packs", location: "Tambaram, Chennai", status: "Delivered", date: "05 Aug 2026 | 06:20 PM", latitude: 12.9249, longitude: 80.1275, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85" },
];

const acceptedStatuses = new Set(["Accepted", "Reserved", "Picked Up", "On The Way", "Delivered"]);

function qrUrl(id: string, token?: string | null) {
  const base = import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;
  const trackingUrl = `${base}/tracking/${id.replace("FD", "")}`;
  const payload = token ? `${trackingUrl}?qr=${encodeURIComponent(token)}` : trackingUrl;
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(payload)}`;
}

export default function MyDonations() {
  const [activeStatus, setActiveStatus] = useState<Status>("All");
  const [donations, setDonations] = useState<DonationView[]>(fallbackDonations);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.email) return;
    fetch(`http://127.0.0.1:5000/api/food/my?email=${encodeURIComponent(user.email)}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success || !Array.isArray(data.foods)) return;
        const mapped = (data.foods as ApiFood[]).map((food) => ({
          id: `FD${String(food.id).padStart(4, "0")}`,
          food: food.food_name,
          quantity: food.quantity,
          location: food.location,
          status: food.status,
          date: food.created_at,
          latitude: 13.0827,
          longitude: 80.2707,
          image: food.food_image || undefined,
          qrToken: food.delivery_qr_token,
        }));
        setDonations(mapped);
      })
      .catch(() => {});
  }, []);

  const filteredDonations = useMemo(() => activeStatus === "All" ? donations : donations.filter((d) => d.status === activeStatus), [activeStatus, donations]);
  const stats = [
    { value: donations.length, label: "Total donations" },
    { value: donations.filter((d) => d.status === "Available").length, label: "Available now" },
    { value: donations.filter((d) => d.status === "Delivered").length, label: "Delivered" },
  ];
  const filters: Status[] = ["All", "Available", "Accepted", "Reserved", "Picked Up", "On The Way", "Delivered"];

  return (
    <main className="my-donations-page">
      <section className="donations-hero"><div><span className="donations-eyebrow">FOODBRIDGE AI • DONOR HUB</span><h1>My Donations</h1><p>Every meal you share moves surplus food safely from donor to community.</p></div><div className="hero-decoration" aria-hidden="true">🥗</div></section>
      <section className="donation-stats" aria-label="Donation summary">{stats.map((stat) => <div className="donation-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</section>
      <div className="donations-toolbar"><div><h2>Your food contributions</h2><p>{filteredDonations.length} donation{filteredDonations.length === 1 ? "" : "s"} shown</p></div><button className="new-donation-button" type="button" onClick={() => window.location.href = "/donate"}>+ New Donation</button></div>
      <div className="donation-filters" role="tablist" aria-label="Filter donations">{filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeStatus === filter} className={activeStatus === filter ? "active" : ""} onClick={() => setActiveStatus(filter)}>{filter}</button>)}</div>
      <section className="donations-grid">
        {filteredDonations.map((donation) => <div className="donation-card-shell" key={donation.id}>
          <DonationCard {...donation} />
          <div className={`delivery-qr-panel ${acceptedStatuses.has(donation.status) ? "active" : "locked"}`}>
            {acceptedStatuses.has(donation.status) ? <><div><span className="qr-kicker">DELIVERY PASS</span><h3>Scan to verify pickup</h3><p>One QR opens live tracking for {donation.id} and can be scanned by the assigned delivery partner.</p></div><img src={qrUrl(donation.id, donation.qrToken)} alt={`Delivery QR for ${donation.id}`} /></> : <div><span className="qr-kicker">QR LOCKED</span><h3>Waiting for NGO acceptance</h3><p>The delivery QR activates automatically when the donation is accepted and assigned.</p></div>}
          </div>
        </div>)}
      </section>
      {filteredDonations.length === 0 && <div className="empty-donations"><span>🍽️</span><h3>No donations in this category</h3><p>Try another status filter to see more of your food contributions.</p></div>}
    </main>
  );
}
