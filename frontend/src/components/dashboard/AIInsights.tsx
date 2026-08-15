import { useState } from "react";

export default function AIInsights() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="ai-insights">

      {/* Header */}
      <div className="ai-insights-header">
        <div className="ai-title">
          <div className="ai-symbol">✦</div>

          <div>
            <span>AI INTELLIGENCE</span>
            <h3>System Insights</h3>
          </div>
        </div>

        <div className="ai-active">
          <span></span>
          ACTIVE
        </div>
      </div>

      {/* Health */}
      <div className="ai-health">
        <div>
          <small>SYSTEM HEALTH</small>

          <div className="health-value">
            <strong>94.8%</strong>
            <span>Optimal</span>
          </div>
        </div>

        <div className="health-ring">
          <div>
            95%
          </div>
        </div>
      </div>

      {/* Attention */}
      <div className="attention-card">
        <div className="attention-icon">
          !
        </div>

        <div>
          <strong>12 donations need attention</strong>

          <p>
            AI detected donations approaching their
            freshness threshold.
          </p>
        </div>
      </div>

      {/* Risk */}
      <div className="risk-section">

        <div className="risk-heading">
          <span>NETWORK RISK LEVEL</span>
          <strong>MODERATE</strong>
        </div>

        <div className="risk-bar">
          <div></div>
        </div>

        <div className="risk-labels">
          <span>LOW</span>
          <span>MODERATE</span>
          <span>HIGH</span>
        </div>

      </div>

      {/* AI predictions */}
      <div className="ai-predictions">

        <div className="prediction">
          <span className="prediction-icon">◈</span>

          <div>
            <strong>Freshness prediction</strong>
            <small>89% confidence</small>
          </div>

          <span className="prediction-value">
            Stable
          </span>
        </div>

        <div className="prediction">
          <span className="prediction-icon">↗</span>

          <div>
            <strong>Demand forecast</strong>
            <small>Next 24 hours</small>
          </div>

          <span className="prediction-value">
            +14%
          </span>
        </div>

      </div>

      {/* Details */}
      {showDetails && (
        <div className="ai-details">

          <p>
            AI monitoring is continuously analyzing
            donation freshness, demand patterns,
            delivery status and distribution efficiency.
          </p>

          <div className="ai-detail-row">
            <span>Freshness monitoring</span>
            <strong>Online</strong>
          </div>

          <div className="ai-detail-row">
            <span>Demand prediction</span>
            <strong>Online</strong>
          </div>

          <div className="ai-detail-row">
            <span>Route optimization</span>
            <strong>Online</strong>
          </div>

        </div>
      )}

      <button
        className="ai-details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide AI details ↑" : "View AI details →"}
      </button>

    </div>
  );
}