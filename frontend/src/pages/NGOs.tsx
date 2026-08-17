import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NGOs.css";

const ngos = [
  { name: "Akshaya Trust", area: "T. Nagar", meals: "1,240", status: "Active", type: "Food Rescue" }, { name: "Chennai Food Bank", area: "Adyar", meals: "980", status: "Active", type: "Community Kitchen" }, { name: "Hope Foundation", area: "Velachery", meals: "760", status: "Active", type: "NGO Partner" }, { name: "Annai Charitable Trust", area: "Anna Nagar", meals: "520", status: "Pending", type: "Food Distribution" }, { name: "Share A Meal", area: "Guindy", meals: "410", status: "Active", type: "Food Rescue" }, { name: "Care Chennai", area: "Tambaram", meals: "335", status: "Active", type: "Community Kitchen" }, { name: "Green Plate Initiative", area: "Mylapore", meals: "690", status: "Active", type: "Food Rescue" }, { name: "Anbu Food Collective", area: "Royapettah", meals: "580", status: "Active", type: "Food Distribution" }, { name: "Chennai Relief Kitchen", area: "Nungambakkam", meals: "845", status: "Active", type: "Community Kitchen" }, { name: "Namma Meals Network", area: "Perambur", meals: "460", status: "Pending", type: "NGO Partner" }, { name: "Urban Food Rescue", area: "Sholinganallur", meals: "720", status: "Active", type: "Food Rescue" }, { name: "HopeServe Foundation", area: "Chromepet", meals: "395", status: "Active", type: "Food Distribution" },
];

type Food = { id: number; food_name: string; quantity: string; location: string; status: string };

export default function NGOs() {
  const [incoming, setIncoming] = useState<Food[]>([]);
  const [receiverName, setReceiverName] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [deliveryPerson, setDeliveryPerson] = useState("");
  const [message, setMessage] = useState("");

  const loadIncoming = () => fetch("http://127.0.0.1:5000/api/food/all").then((r) => r.json()).then((d) => d.success && setIncoming(d.foods.filter((f: Food) => f.status === "Available"))).catch(() => {});
  useEffect(() => { loadIncoming(); }, []);

  const acceptDonation = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:5000/api/food/assign/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ngo_name: "Akshaya Trust", receiver_name: receiverName || "FoodBridge Receiver", telegram_chat_id: telegramChatId, delivery_person_name: deliveryPerson || "FoodBridge Delivery Partner", status: "Accepted" }) });
    const data = await response.json();
    setMessage(data.message || "Donation updated");
    loadIncoming();
  };

  return <div className="ngos-page">
    <header className="ngos-topbar"><Link to="/dashboard" className="ngos-brand">FOODBRIDGE <span>NGO NETWORK</span></Link><div className="ngos-top-actions"><span className="live-pill"><i /> VERIFIED NETWORK</span><Link to="/dashboard" className="back-link">← Dashboard</Link></div></header>
    <main className="ngos-content">
      <div className="ngos-heading"><div><span className="ngos-eyebrow">COMMUNITY PARTNER HUB</span><h1>NGO Partners</h1><p>Coordinate food rescue, pickup and redistribution with FoodBridge community partners.</p></div><div className="ngos-summary"><strong>{ngos.length}</strong><span>Partner NGOs</span></div></div>

      <section className="ngo-console"><div><span className="ngos-eyebrow">DELIVERY CONTROL</span><h2>Accept & assign incoming food</h2><p>Acceptance activates the delivery QR and starts Telegram updates for the receiver.</p></div><div className="ngo-console-fields"><input placeholder="Receiver name" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} /><input placeholder="Telegram chat ID" value={telegramChatId} onChange={(e) => setTelegramChatId(e.target.value)} /><input placeholder="Delivery partner" value={deliveryPerson} onChange={(e) => setDeliveryPerson(e.target.value)} /></div>{message && <div className="ngo-console-message">✓ {message}</div>}<div className="incoming-list">{incoming.length ? incoming.map((food) => <div className="incoming-item" key={food.id}><div><b>FD{String(food.id).padStart(4, "0")} · {food.food_name}</b><span>{food.quantity} · {food.location}</span></div><button type="button" onClick={() => acceptDonation(food.id)}>Accept & Activate QR</button></div>) : <p className="no-incoming">No available donations waiting for acceptance.</p>}</div></section>

      <section className="ngos-toolbar"><div className="ngos-search">⌕ <span>Search NGOs or Chennai locations...</span></div><button type="button">All Partners ▾</button></section>
      <section className="ngo-grid">{ngos.map((ngo) => <article className="ngo-card" key={ngo.name}><div className="ngo-card-top"><div className="ngo-logo">{ngo.name.charAt(0)}</div><span className={`ngo-status ${ngo.status.toLowerCase()}`}><i /> {ngo.status}</span></div><span className="ngo-type">{ngo.type}</span><h2>{ngo.name}</h2><p className="ngo-location">⌖ {ngo.area}, Chennai</p><div className="ngo-stats"><div><strong>{ngo.meals}</strong><span>Meals served</span></div><div><strong>24/7</strong><span>Response</span></div></div><button className="ngo-view" type="button">View Partner →</button></article>)}</section>
    </main>
  </div>;
}
