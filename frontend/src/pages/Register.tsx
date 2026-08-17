import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

type UserType = "" | "donor";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required";
    if (!email.trim()) next.email = "Email is required";
    if (!phone.trim()) next.phone = "Phone number is required";
    if (password.length < 6) next.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, phone, role: "donor", password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      alert("Donor registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Cannot connect to backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-card auth-card-wide">
        <Link to="/" className="auth-logo"><span className="logo-icon">🌉</span><span className="logo-text">FoodBridge AI</span></Link>
        <h1 className="auth-title">Create Donor Account</h1>
        <p className="auth-subtitle">Share surplus food with people who need it.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name</label><input required value={fullName} onChange={e => setFullName(e.target.value)} />{errors.fullName && <span className="error-text">{errors.fullName}</span>}</div>
          <div className="form-group"><label>Email</label><input required type="email" value={email} onChange={e => setEmail(e.target.value)} />{errors.email && <span className="error-text">{errors.email}</span>}</div>
          <div className="form-group"><label>Phone</label><input required value={phone} onChange={e => setPhone(e.target.value)} />{errors.phone && <span className="error-text">{errors.phone}</span>}</div>
          <div className="form-group"><label>Password</label><input required type="password" value={password} onChange={e => setPassword(e.target.value)} />{errors.password && <span className="error-text">{errors.password}</span>}</div>
          <div className="form-group"><label>Confirm Password</label><input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />{errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}</div>
          <button className="btn btn-primary btn-block" disabled={submitting}>{submitting ? "Registering..." : "Create Donor Account"}</button>
        </form>

        <div style={{ marginTop: 18, padding: 16, borderRadius: 14, background: "rgba(35,126,101,.08)", textAlign: "center" }}>
          <strong>Are you an NGO?</strong><br />
          <Link to="/ngo-register">Register your organization separately →</Link>
        </div>
        <p className="auth-footer-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
