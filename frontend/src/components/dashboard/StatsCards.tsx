export default function StatsCards() {
  const stats = [
    {
      label: "MEALS RESCUED",
      value: "18,420",
      change: "+12.4%",
      description: "vs previous month",
    },
    {
      label: "FOOD DIVERTED",
      value: "2,840 kg",
      change: "+8.2%",
      description: "vs previous month",
    },
    {
      label: "DELIVERIES",
      value: "326",
      change: "+16.1%",
      description: "vs previous month",
    },
    {
      label: "EFFICIENCY",
      value: "94.8%",
      change: "+3.7%",
      description: "distribution success",
    },
  ];

  return (
    <div className="cards">
      {stats.map((stat) => (
        <div className="card" key={stat.label}>
          <h3>{stat.label}</h3>

          <p>{stat.value}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                color: "#238b5b",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {stat.change}
            </span>

            <span
              style={{
                color: "#8a968f",
                fontSize: "9px",
              }}
            >
              {stat.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}