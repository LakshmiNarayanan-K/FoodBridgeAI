import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile(){const user=JSON.parse(localStorage.getItem("user")||"{}");const [saved,setSaved]=useState(false);return <main className="profile-page"><header><div><span>ACCOUNT</span><h1>Your profile</h1><p>Manage the details FoodBridge uses for your donations.</p></div><Link to="/dashboard">Dashboard</Link></header><section className="profile-card"><div className="profile-avatar">{(user.full_name||"F").charAt(0).toUpperCase()}</div><div className="profile-form"><label>Full name<input defaultValue={user.full_name||"FoodBridge User"}/></label><label>Email<input type="email" defaultValue={user.email||""}/></label><label>Role<input defaultValue={user.role||"Donor"}/></label><button onClick={()=>setSaved(true)}>Save profile</button>{saved&&<p>Profile saved for this demo session.</p>}</div></section></main>}
