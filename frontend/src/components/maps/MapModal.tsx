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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "700px",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2>{food}</h2>

        <p>{location}</p>

        <iframe
          title="Google Map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        />

        <br />
        <br />

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}