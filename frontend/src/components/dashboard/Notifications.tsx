import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Notice = { id: string; title: string; description: string; time: string; type: string };

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      let user: { email?: string } = {};
      try { user = JSON.parse(localStorage.getItem("user") || "{}"); } catch { user = {}; }
      if (!user.email) { setLoading(false); return; }
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/food/notifications?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (active && data.success) setNotifications(data.notifications || []);
      } catch { /* dashboard remains usable even if backend is offline */ }
      finally { if (active) setLoading(false); }
    };
    load();
    const timer = window.setInterval(load, 10000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const latest = notifications.slice(0, 3);

  return (
    <div className="notifications-container">
      <div className="notification-list">
        {loading && <div className="notification-item"><div className="notification-icon new">…</div><div className="notification-content"><strong>Loading live updates</strong><p>Checking the latest FoodBridge activity.</p></div></div>}
        {!loading && latest.length === 0 && <div className="notification-item"><div className="notification-icon new">🔔</div><div className="notification-content"><strong>No new activity</strong><p>Your donation and delivery updates will appear here automatically.</p></div></div>}
        {latest.map((notification) => (
          <div className="notification-item" key={notification.id}>
            <div className={`notification-icon ${notification.type}`}>{notification.type === "route" ? "🚚" : notification.type === "done" ? "✅" : notification.type === "reserved" ? "📦" : "✓"}</div>
            <div className="notification-content">
              <strong>{notification.title}</strong>
              <p>{notification.description}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        ))}
      </div>
      <Link className="notifications-view" to="/notifications">View all notifications →</Link>
    </div>
  );
}
