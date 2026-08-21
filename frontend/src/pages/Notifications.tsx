import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Notifications.css";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "new" | "accepted" | "reserved" | "route" | "done" | "info";
  foodId: number;
  status: string;
  trackingUrl?: string;
};

function iconFor(type: NotificationItem["type"]) {
  switch (type) {
    case "new": return "🍱";
    case "accepted": return "✓";
    case "reserved": return "📦";
    case "route": return "🚚";
    case "done": return "✅";
    default: return "•";
  }
}

export default function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user?.email) {
        setLoading(false);
        setItems([]);
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/food/notifications?email=${encodeURIComponent(user.email)}`);
        const data = await response.json();
        if (!active) return;
        if (!data.success) throw new Error(data.message || "Unable to load notifications");
        setItems(data.notifications || []);
        setError("");
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load notifications");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const timer = window.setInterval(load, 10000);
    return () => { active = false; window.clearInterval(timer); };
  }, [user?.email]);

  return (
    <main className="notifications-page">
      <header>
        <div>
          <span>ACTIVITY CENTER</span>
          <h1>Notifications</h1>
          <p>Live FoodBridge updates for donations, delivery and email alerts.</p>
        </div>
        <div className="notifications-head-actions">
          <span className="notification-live">● LIVE</span>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </header>

      {loading && <div className="notifications-state">Loading your latest activity…</div>}
      {error && <div className="notifications-state error">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="notifications-empty">
          <div className="empty-icon">🔔</div>
          <h2>No notifications yet</h2>
          <p>Create a donation or update a delivery status and the activity will appear here automatically.</p>
          <Link to="/donate">Create a donation →</Link>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <section className="notifications-list">
          {items.map((notification) => (
            <article key={notification.id} className={`notification-row ${notification.type}`}>
              <div className={`notification-icon ${notification.type}`}>{iconFor(notification.type)}</div>
              <div className="notification-copy">
                <div className="notification-title-line">
                  <h2>{notification.title}</h2>
                  <span>{notification.time}</span>
                </div>
                <p>{notification.description}</p>
                <div className="notification-meta">
                  <b>FD{String(notification.foodId).padStart(4, "0")}</b>
                  <span>{notification.status}</span>
                  {notification.trackingUrl && <Link to={notification.trackingUrl}>Track delivery →</Link>}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
