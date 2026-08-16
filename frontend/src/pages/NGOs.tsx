import { Link } from "react-router-dom";
import "./NGOs.css";

const ngos = [
  { name: "Akshaya Trust", area: "T. Nagar", meals: "1,240", status: "Active", type: "Food Rescue" },
  { name: "Chennai Food Bank", area: "Adyar", meals: "980", status: "Active", type: "Community Kitchen" },
  { name: "Hope Foundation", area: "Velachery", meals: "760", status: "Active", type: "NGO Partner" },
  { name: "Annai Charitable Trust", area: "Anna Nagar", meals: "520", status: "Pending", type: "Food Distribution" },
  { name: "Share A Meal", area: "Guindy", meals: "410", status: "Active", type: "Food Rescue" },
  { name: "Care Chennai", area: "Tambaram", meals: "335", status: "Active", type: "Community Kitchen" },
];

export default function NGOs() {
  return (
    <div className="ngos-page">
      <header className="ngos-topbar">
        <Link to="/dashboard" className="ngos-brand">FOODBRIDGE <span>AI</span></Link>
        <div className="ngos-top-actions">
          <span className="live-pill"><i /> LIVE NETWORK</span>
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
        </div>
      </header>
      <main className="ngos-content">
        <div className="ngos-heading">
          <div>
            <span className="ngos-eyebrow">NETWORK DIRECTORY</span>
            <h1>NGO Partners</h1>
            <p>Discover and coordinate with verified food redistribution partners across Chennai.</p>
          </div>
          <div className="ngos-summary"><strong>{ngos.length}</strong><span>Partner NGOs</span></div>
        </div>
        <section className="ngos-toolbar">
          <div className="ngos-search">⌕ <span>Search NGOs or locations...</span></div>
          <button>All Partners ▾</button>
        </section>
        <section className="ngo-grid">
          {ngos.map((ngo) => (
            <article className="ngo-card" key={ngo.name}>
              <div className="ngo-card-top">
                <div className="ngo-logo">{ngo.name.charAt(0)}</div>
                <span className={`ngo-status ${ngo.status.toLowerCase()}`}><i /> {ngo.status}</span>
              </div>
              <span className="ngo-type">{ngo.type}</span>
              <h2>{ngo.name}</h2>
              <p className="ngo-location">⌖ {ngo.area}, Chennai</p>
              <div className="ngo-stats">
                <div><strong>{ngo.meals}</strong><span>Meals served</span></div>
                <div><strong>24/7</strong><span>Response</span></div>
              </div>
              <button className="ngo-view">View Partner →</button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
