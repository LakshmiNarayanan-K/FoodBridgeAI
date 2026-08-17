import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NGOLogin.css";

const NGOLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      if (data.user?.role !== "ngo") throw new Error("This login is only for registered NGO accounts.");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.ngo_profile) localStorage.setItem("ngo_profile", JSON.stringify(data.ngo_profile));
      navigate("/ngos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot connect to backend.");
    } finally { setLoading(false); }
  };

  return <div className="ngo-login-page">
    <div className="ngo-login-grid" />
    <div className="ngo-login-card">
      <Link to="/" className="ngo-login-brand">FOODBRIDGE <span>NGO NETWORK</span></Link>
      <div className="ngo-login-icon">🏢</div>
      <span className="ngo-login-kicker">PARTNER ACCESS</span>
      <h1>NGO Command Center</h1>
      <p>Sign in to discover food, accept donations and coordinate deliveries.</p>
      <form onSubmit={submit}>
        <label>Organization email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ngo@example.org" /></label>
        <label>Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" /></label>
        {error && <div className="ngo-login-error">{error}</div>}
        <button disabled={loading}>{loading ? "Signing in..." : "Enter NGO Command Center →"}</button>
      </form>
      <div className="ngo-login-links"><Link to="/ngo-register">Register NGO</Link><span>·</span><Link to="/login">Donor Login</Link></div>
    </div>
  </div>;
};
export default NGOLogin;
