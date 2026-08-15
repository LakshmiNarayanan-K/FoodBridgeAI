const donations = [
  {
    id: "FD1025",
    food: "Biryani",
    route: "Central Kitchen → Velachery",
    status: "IN TRANSIT",
    time: "12 min ago",
  },
  {
    id: "FD1024",
    food: "Fresh Fruits",
    route: "Anna Nagar → Tambaram",
    status: "DELIVERED",
    time: "28 min ago",
  },
  {
    id: "FD1023",
    food: "Veg Meals",
    route: "Porur → Kundrathur",
    status: "IN TRANSIT",
    time: "41 min ago",
  },
  {
    id: "FD1022",
    food: "Bread & Milk",
    route: "Ambattur → Avadi",
    status: "DELIVERED",
    time: "1 hr ago",
  },
];

export default function RecentDonations() {
  return (
    <div className="recent-donations">

      {donations.map((donation) => (
        <div className="distribution-item" key={donation.id}>

          <div className="distribution-indicator">
            <span
              className={
                donation.status === "DELIVERED"
                  ? "delivery-dot"
                  : "transit-dot"
              }
            />
          </div>

          <div className="distribution-info">
            <div className="distribution-top">
              <strong>{donation.id}</strong>

              <span
                className={
                  donation.status === "DELIVERED"
                    ? "delivery-status"
                    : "transit-status"
                }
              >
                {donation.status}
              </span>
            </div>

            <strong className="food-name">
              {donation.food}
            </strong>

            <p>{donation.route}</p>
          </div>

          <span className="distribution-time">
            {donation.time}
          </span>

        </div>
      ))}

    </div>
  );
}