import DonationCard from "../components/donations/DonationCard";

export default function MyDonations() {
  const donations = [
    {
      id: "FD1001",
      food: "🍱 Idly & Sambar",
      quantity: "100 Meals",
      location: "Kundrathur, Chennai",
      status: "Available",
      date: "06 Aug 2026 | 09:30 AM",
    },
    {
      id: "FD1002",
      food: "🍛 Veg Meals",
      quantity: "75 Meals",
      location: "Porur, Chennai",
      status: "Reserved",
      date: "06 Aug 2026 | 10:45 AM",
    },
    {
      id: "FD1003",
      food: "🥗 Fruits",
      quantity: "40 Packs",
      location: "Tambaram, Chennai",
      status: "Delivered",
      date: "05 Aug 2026 | 06:20 PM",
    },
    {
      id: "FD1004",
      food: "🍋 Lemon Rice",
      quantity: "120 Meals",
      location: "Guindy, Chennai",
      status: "Available",
      date: "04 Aug 2026 | 11:15 AM",
    },
    {
      id: "FD1005",
      food: "🍛 Biryani",
      quantity: "150 Meals",
      location: "Velachery, Chennai",
      status: "On The Way",
      date: "04 Aug 2026 | 01:30 PM",
    },
    {
      id: "FD1006",
      food: "🥪 Sandwiches",
      quantity: "60 Packs",
      location: "Adyar, Chennai",
      status: "Delivered",
      date: "03 Aug 2026 | 09:00 AM",
    },
    {
      id: "FD1007",
      food: "🥣 Pongal",
      quantity: "80 Meals",
      location: "Anna Nagar, Chennai",
      status: "Available",
      date: "03 Aug 2026 | 08:30 AM",
    },
    {
      id: "FD1008",
      food: "🍕 Pizza",
      quantity: "30 Boxes",
      location: "T Nagar, Chennai",
      status: "Reserved",
      date: "02 Aug 2026 | 06:15 PM",
    },
    {
      id: "FD1009",
      food: "🍜 Noodles",
      quantity: "90 Boxes",
      location: "Chromepet, Chennai",
      status: "Delivered",
      date: "02 Aug 2026 | 12:00 PM",
    },
    {
      id: "FD1010",
      food: "🍞 Bread",
      quantity: "200 Loaves",
      location: "Ambattur, Chennai",
      status: "Available",
      date: "01 Aug 2026 | 07:45 AM",
    },
  ];

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#1f2937",
        }}
      >
        📦 My Donations
      </h1>

      {donations.map((donation) => (
        <DonationCard
          key={donation.id}
          id={donation.id}
          food={donation.food}
          quantity={donation.quantity}
          location={donation.location}
          status={donation.status}
          date={donation.date}
        />
      ))}
    </div>
  );
}