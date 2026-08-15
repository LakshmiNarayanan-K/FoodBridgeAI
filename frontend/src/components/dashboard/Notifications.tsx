const notifications = [
  {
    icon: "🍱",
    title: "New food donation received",
    description: "100 meals are available in Kundrathur.",
    time: "2 min ago",
    type: "new",
  },
  {
    icon: "🏢",
    title: "NGO accepted your donation",
    description: "Helping Hands NGO accepted FD1025.",
    time: "18 min ago",
    type: "success",
  },
  {
    icon: "🚚",
    title: "Delivery scheduled",
    description: "Volunteer pickup scheduled for 11:30 AM.",
    time: "32 min ago",
    type: "warning",
  },
];

export default function Notifications() {
  return (
    <div className="notifications-container">

      <div className="notification-list">

        {notifications.map((notification) => (
          <div
            className="notification-item"
            key={notification.title}
          >

            <div className={`notification-icon ${notification.type}`}>
              {notification.icon}
            </div>

            <div className="notification-content">

              <strong>
                {notification.title}
              </strong>

              <p>
                {notification.description}
              </p>

              <small>
                {notification.time}
              </small>

            </div>

          </div>
        ))}

      </div>

      <button className="notifications-view">
        View all notifications →
      </button>

    </div>
  );
}