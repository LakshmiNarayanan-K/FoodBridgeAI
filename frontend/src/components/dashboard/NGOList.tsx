const network = [
  {
    label: "NGOs",
    value: "24",
    status: "Active",
  },
  {
    label: "Volunteers",
    value: "86",
    status: "Online",
  },
  {
    label: "Locations",
    value: "12",
    status: "Monitored",
  },
];

export default function NGOList() {
  return (
    <div className="network-status">

      <div className="network-items">

        {network.map((item) => (
          <div className="network-item" key={item.label}>

            <div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>

            <div className="network-state">
              <span />
              {item.status}
            </div>

          </div>
        ))}

      </div>

      <div className="distribution-health">

        <div className="health-header">
          <span>Distribution health</span>
          <strong>92%</strong>
        </div>

        <div className="health-bar">
          <div />
        </div>

        <p>
          Network operating within optimal capacity.
        </p>

      </div>

    </div>
  );
}