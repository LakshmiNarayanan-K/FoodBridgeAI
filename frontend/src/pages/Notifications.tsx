import { Link } from "react-router-dom";
import "./Notifications.css";

const items=[["Donation accepted","Smile Foundation accepted FD0011 and delivery is being arranged.","Just now","accepted"],["QR activated","Your delivery QR is ready for the assigned partner.","8 min ago","qr"],["Food is on the way","The delivery partner has started the final trip.","24 min ago","route"],["Delivery completed","FD0009 was delivered successfully.","Yesterday","done"]];
export default function Notifications(){return <main className="notifications-page"><header><div><span>ACTIVITY CENTER</span><h1>Notifications</h1><p>Important updates from your FoodBridge deliveries.</p></div><Link to="/dashboard">Dashboard</Link></header><section className="notifications-list">{items.map(([title,copy,time,type])=><article key={title}><div className={`notification-icon ${type}`}>✓</div><div className="notification-copy"><h2>{title}</h2><p>{copy}</p><small>{time}</small></div></article>)}</section></main>}
