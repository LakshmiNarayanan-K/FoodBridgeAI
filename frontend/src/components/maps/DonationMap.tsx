import { useParams } from "react-router-dom";

export default function DonationMap() {
  const { id } = useParams();

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🗺 Donation Location</h1>

      <h2>{id}</h2>

      <iframe
        title="map"
        width="100%"
        height="500"
        style={{
          border: 0,
          borderRadius: "12px",
          marginTop: "20px",
        }}
        loading="lazy"
        src="https://maps.google.com/maps?q=13.0827,80.2707&z=13&output=embed"
      ></iframe>
    </div>
  );
}