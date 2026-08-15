const reviews = [
  {
    ngo: "Helping Hands NGO",
    rating: 5,
    text: "Fresh food received on time.",
    time: "Today · 10:42 AM",
  },
  {
    ngo: "Hope Foundation",
    rating: 4,
    text: "Excellent service and smooth coordination.",
    time: "Yesterday · 06:18 PM",
  },
  {
    ngo: "No Food Waste",
    rating: 5,
    text: "Food quality was excellent.",
    time: "Yesterday · 02:35 PM",
  },
];

export default function ReceiverReviews() {
  return (
    <div className="reviews-container">

      <div className="reviews-summary">
        <div>
          <span className="summary-label">AVERAGE RATING</span>

          <div className="rating-number">
            4.9
            <span>/5</span>
          </div>
        </div>

        <div className="rating-stars">
          ★★★★★
        </div>
      </div>

      <div className="review-list">

        {reviews.map((review) => (
          <div className="review-item" key={review.ngo}>

            <div className="review-top">
              <strong>{review.ngo}</strong>

              <span className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>

            <p>{review.text}</p>

            <small>{review.time}</small>

          </div>
        ))}

      </div>

    </div>
  );
}