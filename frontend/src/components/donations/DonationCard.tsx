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
import { getFoodImage } from "../../utils/foodImages";

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
  const resolvedImage = image || getFoodImage(food);

  return (
    <article className="donation-card">
      <div className="donation-image-wrap">
        <img className="donation-image" src={resolvedImage} alt={`${food.replace(/^[^\s]+\s/, "")} donation`} />
        <div className="image-overlay" aria-hidden="true" />
        <span className={`status image-status ${statusClass}`}>{status}</span>
        <span className="freshness-badge">✦ {freshness}% fresh</span>
        <div className="image-caption"><span>FoodBridge AI</span><strong>Fresh food, ready to help.</strong></div>
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
          <Link to={`/track/${id.replace(/^FD/, "")}`} className="track-btn">
            <FaTruck /> Track Donation
          </Link>
        </div>
      </div>
    </article>
  );
}
