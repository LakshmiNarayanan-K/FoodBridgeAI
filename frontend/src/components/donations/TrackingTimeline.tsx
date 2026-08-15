import { useParams } from "react-router-dom";

export default function TrackingTimeline() {
  const { id } = useParams();

  const steps = [
    "Donation Created",
    "NGO Accepted",
    "Volunteer Assigned",
    "Food Picked Up",
    "On The Way",
    "Delivered",
  ];

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🚚 Track Donation</h1>

      <h2>{id}</h2>

      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#16a34a",
              marginRight: "15px",
            }}
          ></div>

          <h3>{step}</h3>
        </div>
      ))}
    </div>
  );
}