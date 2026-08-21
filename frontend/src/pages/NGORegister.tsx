import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NGORegister.css";

const NGORegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    registrationId: "",
    serviceArea: "",
    address: "",
    website: "",
    description: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          role: "ngo",
          password: form.password,
          organization_name: form.organizationName,
          registration_id: form.registrationId,
          service_area: form.serviceArea,
          address: form.address,
          website: form.website,
          description: form.description,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "NGO registration failed.");
      navigate("/login", { state: { message: "NGO account created. Please log in." } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register NGO.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ngo-register-page">
      <div className="ngo-register-orb orb-one" />
      <div className="ngo-register-orb orb-two" />
      <div className="ngo-register-shell">
        <aside className="ngo-register-intro">
          <Link to="/" className="ngo-register-brand">FOODBRIDGE <span>NGO NETWORK</span></Link>
          <div className="ngo-badge">🏢 PARTNER REGISTRATION</div>
          <h1>Turn rescued food into real community impact.</h1>
          <p>Register your NGO to discover available donations, coordinate pickups, manage deliveries and keep receivers informed.</p>
          <div className="ngo-register-points">
            <div><b>01</b><span>Access the NGO Command Center</span></div>
            <div><b>02</b><span>Accept food donations and activate delivery QR</span></div>
            <div><b>03</b><span>Track every handoff from pickup to delivery</span></div>
          </div>
        </aside>

        <main className="ngo-register-card">
          <div className="ngo-form-head">
            <span>NEW NGO PARTNER</span>
            <h2>Create your organization account</h2>
            <p>Use official organization details so your team can operate as an NGO.</p>
          </div>

          {error && <div className="ngo-form-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="ngo-form-grid">
              <label>Contact person<input required value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Full name" /></label>
              <label>Organization name<input required value={form.organizationName} onChange={e => update("organizationName", e.target.value)} placeholder="NGO / Trust name" /></label>
              <label>Email<input required type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="ngo@example.org" /></label>
              <label>Phone<input required value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91..." /></label>
              <label>Registration ID<input required value={form.registrationId} onChange={e => update("registrationId", e.target.value)} placeholder="12A / 80G / Trust ID" /></label>
              <label>Service area<input required value={form.serviceArea} onChange={e => update("serviceArea", e.target.value)} placeholder="Chennai, Velachery..." /></label>
              <label className="wide">Address<textarea required value={form.address} onChange={e => update("address", e.target.value)} placeholder="Organization address" /></label>
              <label>Website<input value={form.website} onChange={e => update("website", e.target.value)} placeholder="https://..." /></label>
              <label>Description<input value={form.description} onChange={e => update("description", e.target.value)} placeholder="What your NGO supports" /></label>
              <label>Password<input required type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="Minimum 6 characters" /></label>
              <label>Confirm password<input required type="password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="Repeat password" /></label>
            </div>
            <button className="ngo-register-submit" disabled={submitting}>{submitting ? "Creating NGO account..." : "Create NGO Account →"}</button>
          </form>
          <p className="ngo-register-footer">Already registered? <Link to="/login">Sign in</Link> · <Link to="/register">Donor registration</Link></p>
        </main>
      </div>
    </div>
  );
};

export default NGORegister;
