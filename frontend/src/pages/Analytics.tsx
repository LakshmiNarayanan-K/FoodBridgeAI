import { Link } from "react-router-dom";
import "./Analytics.css";

const rows = [
  ["Meals rescued", "18,420", "+12.4%"],
  ["Food diverted", "2,840 kg", "+8.2%"],
  ["Deliveries", "326", "+16.1%"],
  ["Success rate", "94.8%", "+3.7%"],
];

export default function Analytics(){return <main className="analytics-page"><header className="analytics-head"><div><span>INSIGHTS</span><h1>Food redistribution analytics</h1><p>See the impact created across donations, delivery and NGO redistribution.</p></div><Link to="/dashboard">Back to dashboard</Link></header><section className="analytics-stats">{rows.map(([label,value,change])=><article key={label}><small>{label}</small><strong>{value}</strong><em>{change} this month</em></article>)}</section><section className="analytics-panels"><article><div className="panel-title"><span>6-MONTH TREND</span><b>Meals rescued</b></div><div className="bars">{[52,64,58,76,70,88].map((h,i)=><div key={i}><span style={{height:`${h}%`}}/><small>{["Mar","Apr","May","Jun","Jul","Aug"][i]}</small></div>)}</div></article><article className="impact-card"><span>COMMUNITY IMPACT</span><h2>Every accepted donation becomes a measurable delivery.</h2><p>FoodBridge combines donor supply, NGO capacity and delivery performance into one transparent workflow.</p><div className="impact-row"><b>91%</b><span>food matched to a community partner</span></div><div className="impact-row"><b>326</b><span>deliveries coordinated this period</span></div></article></section></main>}
