import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import StatsCards from "../components/dashboard/StatsCards";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentDonations from "../components/dashboard/RecentDonations";
import ReceiverReviews from "../components/dashboard/ReceiverReviews";
import Notifications from "../components/dashboard/Notifications";
import NGOList from "../components/dashboard/NGOList";
import AIInsights from "../components/dashboard/AIInsights";

import "./Dashboard.css";

interface User {
  full_name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">FB</div>

          <div>
            <h2>FOODBRIDGE</h2>
            <span>AI PLATFORM</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span>COMMAND</span>

          <Link to="/dashboard" className="nav-link active">
            <span>⌂</span>
            Overview
          </Link>
        </div>

        <div className="sidebar-section">
          <span>OPERATIONS</span>

          <Link to="/my-donations" className="nav-link">
            <span>▣</span>
            Donations
          </Link>

          <Link to="/donate" className="nav-link">
            <span>⇄</span>
            Distribution
          </Link>

          <Link to="/profile" className="nav-link">
            <span>♙</span>
            Volunteers
          </Link>
        </div>

        <div className="sidebar-section">
          <span>NETWORK</span>

          <Link to="/ngos" className="nav-link">
            <span>▤</span>
            NGOs
          </Link>

          <Link to="/my-donations" className="nav-link">
            <span>⌖</span>
            Locations
          </Link>
        </div>

        <div className="sidebar-section">
          <span>INSIGHTS</span>

          <Link to="/analytics" className="nav-link">
            <span>◫</span>
            Analytics
          </Link>

          <Link to="/dashboard" className="nav-link">
            <span>✦</span>
            AI Insights
          </Link>
        </div>

        <div className="sidebar-section">
          <span>SYSTEM</span>

          <Link to="/notifications" className="nav-link">
            <span>◉</span>
            Notifications
          </Link>

          <Link to="/profile" className="nav-link">
            <span>⚙</span>
            Settings
          </Link>
        </div>

        <div className="sidebar-bottom">
          <div className="user-mini">
            <div className="user-avatar">
              {user?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <strong>{user?.full_name || "User"}</strong>
              <small>{user?.role || "Donor"}</small>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        {/* TOP HEADER */}
        <header className="topbar">

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search donations, NGOs, locations..."
            />
          </div>

          <div className="topbar-right">

            <div className="live-status">
              <span className="live-dot"></span>
              LIVE
            </div>

            <button className="notification-icon">
              ◉
              <span>3</span>
            </button>

            <div className="top-user">
              <div className="top-avatar">
                {user?.full_name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <strong>{user?.full_name || "User"}</strong>
                <small>{user?.role || "Donor"}</small>
              </div>
            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}
        <div className="content">

          {/* PAGE TITLE */}
          <div className="page-heading">

            <div>
              <span className="eyebrow">OVERVIEW</span>

              <h1>Food Redistribution Intelligence</h1>

              <p>
                Chennai · Today, 08 Aug 2026
              </p>
            </div>

            <div className="system-status">
              <span className="status-dot"></span>
              All systems operational
            </div>

          </div>

          {/* ================= STATISTICS ================= */}
          <section className="stats-section">
            <StatsCards />
          </section>

          {/* ================= MAIN ANALYTICS ================= */}
          <section className="analytics-layout">

            <div className="chart-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-label">
                    REDISTRIBUTION ACTIVITY
                  </span>

                  <h2>Food rescue performance</h2>
                </div>

                <button className="period-button">
                  Last 6 months ▾
                </button>
              </div>

              <DashboardCharts />
            </div>

            {/* AI PANEL */}
            <div className="ai-panel">

              <div className="ai-header">
                <div className="ai-icon">✦</div>

                <div>
                  <span>AI INTELLIGENCE</span>
                  <h3>System Insights</h3>
                </div>
              </div>

              <div className="health-indicator">
                <span className="live-dot"></span>
                SYSTEM HEALTH
              </div>

              <div className="ai-number">
                12
              </div>

              <p>
                donations currently need attention.
              </p>

              <div className="risk-box">
                <span>Current risk level</span>
                <strong>Moderate</strong>
              </div>

              <div className="ai-progress">
                <div></div>
              </div>

              <small>
                AI monitoring is active across the network.
              </small>

            </div>

          </section>

          {/* ================= OPERATIONS ================= */}
          <section className="operations-grid">

            <div className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-label">
                    LIVE DISTRIBUTION
                  </span>

                  <h2>Recent activity</h2>
                </div>

                <Link to="/my-donations">
                  View all →
                </Link>
              </div>

              <RecentDonations />
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-label">
                    NETWORK STATUS
                  </span>

                  <h2>Distribution network</h2>
                </div>
              </div>

              <NGOList />
            </div>

          </section>

          {/* ================= LOWER GRID ================= */}
          <section className="lower-grid">

            <div className="dashboard-panel">
              <ReceiverReviews />
            </div>

            <div className="dashboard-panel">
              <Notifications />
            </div>

          </section>

          {/* ================= IMPACT ================= */}
          <section className="impact-section">

            <div>
              <span>COMMUNITY IMPACT</span>
              <strong>18,420</strong>
              <small>Meals rescued</small>
            </div>

            <div>
              <strong>6.2T</strong>
              <small>Food redistributed</small>
            </div>

            <div>
              <strong>2.4T</strong>
              <small>CO₂e prevented</small>
            </div>

            <div>
              <strong>94.8%</strong>
              <small>Distribution efficiency</small>
            </div>

          </section>

        </div>

      </main>

    </div>
  );
}