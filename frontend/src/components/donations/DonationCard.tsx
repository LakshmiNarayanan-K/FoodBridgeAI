import {
  FaMapMarkerAlt,
  FaTruck,
  FaCalendarAlt,
  FaBoxOpen,
  FaClock,
  FaRobot,
  FaBuilding,
  FaUser,
  FaStar,
} from "react-icons/fa";

import "./DonationCard.css";
import { Link } from "react-router-dom";

interface DonationProps {
  id: string;
  food: string;
  quantity: string;
  location: string;
  status: string;
  date: string;
  latitude: number;
  longitude: number;
  image?: string;
}

export default function DonationCard({
  id,
  food,
  quantity,
  location,
  status,
  date,
  latitude,
  longitude,
  image,
}: DonationProps) {
  const freshness = Math.floor(Math.random() * 6) + 95;
  const ngoList = ["Helping Hands", "No Food Waste", "Feeding India", "Smile Foundation", "Hope Trust"];
  const ngo = ngoList[Math.floor(Math.random() * ngoList.length)];
  const statusClass = status.toLowerCase().replace(/\s/g, "-");

  return (
    <article className="donation-card">
      <div className="donation-image-wrap">
        {image ? (
          <img className="donation-image" src={image} alt={`${food.replace(/^[^\s]+\s/, "")} donation`} />
        ) : (
          <div className="food-image" aria-hidden="true">🍱</div>
        )}
        <span className={`status image-status ${statusClass}`}>{status}</span>
        <span className="freshness-badge">✦ {freshness}% fresh</span>
      </div>

      <div className="donation-content">
        <div className="header">
          <div>
            <span className="donation-kicker">FOOD DONATION</span>
            <h2>{food}</h2>
            <p className="donation-id">Donation ID · {id}</p>
          </div>
        </div>

        <div className="details">
          <div><FaBoxOpen /><span>{quantity}</span></div>
          <div><FaMapMarkerAlt /><span>{location}</span></div>
          <div><FaCalendarAlt /><span>{date}</span></div>
          <div><FaClock /><span>Expires in 2 Hours</span></div>
          <div><FaRobot /><span>AI Freshness {freshness}%</span></div>
          <div><FaBuilding /><span>{ngo}</span></div>
          <div><FaUser /><span>Volunteer Pending</span></div>
          <div><FaStar /><span>4.9 Rating</span></div>
        </div>

        <div className="card-actions">
          <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer" className="location-btn">
            <FaMapMarkerAlt /> View Location
          </a>
          <Link to={`/track/${id}`} className="track-btn">
            <FaTruck /> Track Donation
          </Link>
        </div>
      </div>
    </article>
  );
}
