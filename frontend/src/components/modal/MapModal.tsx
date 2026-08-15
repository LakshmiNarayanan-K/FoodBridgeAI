import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapModal.css";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: string;
  location: string;
  latitude: number;
  longitude: number;
}

export default function MapModal({
  isOpen,
  onClose,
  food,
  location,
  latitude,
  longitude,
}: MapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>📍 Donation Location</h2>

        <h3>{food}</h3>

        <p>{location}</p>

        <div className="map-container">

          <MapContainer
            center={[latitude, longitude]}
            zoom={14}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[latitude, longitude]}>
              <Popup>{food}</Popup>
            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>
  );
}