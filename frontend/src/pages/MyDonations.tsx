import { useMemo, useState } from "react";
import DonationCard from "../components/donations/DonationCard";
import "./MyDonations.css";

type Status = "All" | "Available" | "Reserved" | "On The Way" | "Delivered";

const donations = [
  { id: "FD1001", food: "🍱 Idly & Sambar", quantity: "100 Meals", location: "Kundrathur, Chennai", status: "Available", date: "06 Aug 2026 | 09:30 AM", latitude: 13.0119, longitude: 80.153, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1002", food: "🍛 Veg Meals", quantity: "75 Meals", location: "Porur, Chennai", status: "Reserved", date: "06 Aug 2026 | 10:45 AM", latitude: 13.0358, longitude: 80.1561, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1003", food: "🥗 Fruits", quantity: "40 Packs", location: "Tambaram, Chennai", status: "Delivered", date: "05 Aug 2026 | 06:20 PM", latitude: 12.9249, longitude: 80.1275, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1004", food: "🍋 Lemon Rice", quantity: "120 Meals", location: "Guindy, Chennai", status: "Available", date: "04 Aug 2026 | 11:15 AM", latitude: 13.0067, longitude: 80.2206, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1005", food: "🍛 Biryani", quantity: "150 Meals", location: "Velachery, Chennai", status: "On The Way", date: "04 Aug 2026 | 01:30 PM", latitude: 12.9815, longitude: 80.218, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1006", food: "🥪 Sandwiches", quantity: "60 Packs", location: "Adyar, Chennai", status: "Delivered", date: "03 Aug 2026 | 09:00 AM", latitude: 13.0012, longitude: 80.2565, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1007", food: "🥣 Pongal", quantity: "80 Meals", location: "Anna Nagar, Chennai", status: "Available", date: "03 Aug 2026 | 08:30 AM", latitude: 13.085, longitude: 80.2101, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1008", food: "🍕 Pizza", quantity: "30 Boxes", location: "T Nagar, Chennai", status: "Reserved", date: "02 Aug 2026 | 06:15 PM", latitude: 13.0418, longitude: 80.2341, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1009", food: "🍜 Noodles", quantity: "90 Boxes", location: "Chromepet, Chennai", status: "Delivered", date: "02 Aug 2026 | 12:00 PM", latitude: 12.9516, longitude: 80.1462, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85" },
  { id: "FD1010", food: "🍞 Bread", quantity: "200 Loaves", location: "Ambattur, Chennai", status: "Available", date: "01 Aug 2026 | 07:45 AM", latitude: 13.1143, longitude: 80.1489, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85" },
];

export default function MyDonations() {
  const [activeStatus, setActiveStatus] = useState<Status>("All");
  const filteredDonations = useMemo(
    () => activeStatus === "All" ? donations : donations.filter((donation) => donation.status === activeStatus),
    [activeStatus]
  );

  const stats = [
    { value: donations.length, label: "Total donations" },
    { value: donations.filter((d) => d.status === "Available").length, label: "Available now" },
    { value: donations.filter((d) => d.status === "Delivered").length, label: "Delivered" },
  ];
  const filters: Status[] = ["All", "Available", "Reserved", "On The Way", "Delivered"];

  return (
    <main className="my-donations-page">
      <section className="donations-hero">
        <div>
          <span className="donations-eyebrow">FOODBRIDGE AI • DONOR HUB</span>
          <h1>My Donations</h1>
          <p>Every meal you share helps move surplus food to someone who needs it.</p>
        </div>
        <div className="hero-decoration" aria-hidden="true">🥗</div>
      </section>

      <section className="donation-stats" aria-label="Donation summary">
        {stats.map((stat) => (
          <div className="donation-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <div className="donations-toolbar">
        <div>
          <h2>Your food contributions</h2>
          <p>{filteredDonations.length} donation{filteredDonations.length === 1 ? "" : "s"} shown</p>
        </div>
        <button className="new-donation-button" type="button" onClick={() => window.location.href = "/donate"}>
          + New Donation
        </button>
      </div>

      <div className="donation-filters" role="tablist" aria-label="Filter donations">
        {filters.map((filter) => (
          <button key={filter} type="button" role="tab" aria-selected={activeStatus === filter} className={activeStatus === filter ? "active" : ""} onClick={() => setActiveStatus(filter)}>
            {filter}
          </button>
        ))}
      </div>

      <section className="donations-grid">
        {filteredDonations.map((donation) => <DonationCard key={donation.id} {...donation} />)}
      </section>

      {filteredDonations.length === 0 && (
        <div className="empty-donations">
          <span>🍽️</span>
          <h3>No donations in this category</h3>
          <p>Try another status filter to see more of your food contributions.</p>
        </div>
      )}
    </main>
  );
}
