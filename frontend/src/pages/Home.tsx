import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const features = [
    {
      icon: "🍎",
      title: "Smart Matching",
      desc: "AI pairs surplus food with nearby shelters and NGOs in real time based on quantity, type, and urgency.",
    },
    {
      icon: "📍",
      title: "Live Location Tracking",
      desc: "Interactive maps show donors and recipients nearby, making pickup coordination effortless.",
    },
    {
      icon: "⚡",
      title: "Instant Alerts",
      desc: "Recipients get notified the moment surplus food becomes available in their area.",
    },
    {
      icon: "📊",
      title: "Impact Dashboard",
      desc: "Track meals saved, CO₂ emissions reduced, and community impact with live analytics.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Donor Posts Surplus",
      desc: "Restaurants, stores, and individuals list surplus food with quantity and pickup window.",
    },
    {
      number: "02",
      title: "AI Finds a Match",
      desc: "Our engine scores nearby shelters and NGOs by need, distance, and capacity.",
    },
    {
      number: "03",
      title: "Recipient Confirms",
      desc: "Matched organization accepts the donation and schedules pickup instantly.",
    },
    {
      number: "04",
      title: "Food Reaches People",
      desc: "Surplus food is delivered where it's needed most, reducing waste and hunger.",
    },
  ];

  const stats = [
    { value: "12K+", label: "Meals Redistributed" },
    { value: "500+", label: "Partner Organizations" },
    { value: "8.5T", label: "Food Waste Diverted" },
    { value: "95%", label: "Match Success Rate" },
  ];

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">🌉</span>
            <span className="logo-text">FoodBridge AI</span>
          </div>
          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#stats">Impact</a>
          </div>
          <div className="navbar-actions">
            <Link to="/login" className="btn btn-ghost">
              Log In
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <span className="hero-badge">✨ AI-Powered Food Rescue</span>
          <h1 className="hero-title">
            Bridging Surplus Food <br />
            with <span className="gradient-text">People Who Need It</span>
          </h1>
          <p className="hero-subtitle">
            FoodBridge AI connects restaurants, stores, and donors with
            shelters and NGOs using intelligent matching — turning surplus
            into support, in minutes.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Donating →
            </Link>
            <Link to="/browse" className="btn btn-outline btn-lg">
              Find Food Near You
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-tag">Why FoodBridge</span>
          <h2>Everything You Need to Fight Food Waste</h2>
          <p>
            A complete platform connecting donors and recipients through
            smart, explainable AI.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2>How FoodBridge AI Works</h2>
          <p>From surplus to sustenance in four simple steps.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="stats" id="stats">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-box">
          <h2>Ready to Make an Impact?</h2>
          <p>
            Join hundreds of organizations already reducing food waste and
            feeding communities with FoodBridge AI.
          </p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Join FoodBridge AI
            </Link>
            <Link to="/about" className="btn btn-ghost btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="navbar-logo">
              <span className="logo-icon">🌉</span>
              <span className="logo-text">FoodBridge AI</span>
            </div>
            <p>Connecting surplus with sustenance, powered by AI.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#stats">Impact</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 FoodBridge AI. Built for DTI Hackathon.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;