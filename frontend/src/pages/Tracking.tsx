import "./Tracking.css";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";

export default function Tracking() {
  return (
    <div className="tracking-container">

      <h1>🚚 Live Donation Tracking</h1>

      <div className="tracking-card">

        <h2>Donation ID : FD1001</h2>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>

        <p className="eta">
          Estimated Arrival : <b>00 : 45</b>
        </p>

        <div className="timeline">

          <div className="step completed">
            <FaCheckCircle />
            <span>Donation Accepted</span>
          </div>

          <div className="step completed">
            <FaCheckCircle />
            <span>Volunteer Assigned</span>
          </div>

          <div className="step completed">
            <FaBoxOpen />
            <span>Food Picked Up</span>
          </div>

          <div className="step active">
            <FaTruck />
            <span>On The Way</span>
          </div>

          <div className="step">
            <FaMapMarkerAlt />
            <span>Delivered</span>
          </div>

        </div>

      </div>

    </div>
  );
}