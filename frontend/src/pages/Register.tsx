import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

type UserType = "" | "donor" | "ngo";

interface RegisterErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  userType?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<UserType>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!userType) {
      newErrors.userType = "Please select a user type";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          phone: phone,
          role: userType,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow"></div>

      <div className="auth-card auth-card-wide">

        <Link to="/" className="auth-logo">
          <span className="logo-icon">🌉</span>
          <span className="logo-text">FoodBridge AI</span>
        </Link>

        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">
          Join FoodBridge AI today.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label>User Type</label>

            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
            >
              <option value="">Select</option>
              <option value="donor">Food Donor</option>
              <option value="ngo">NGO</option>
            </select>

            {errors.userType && (
              <span className="error-text">{errors.userType}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="auth-footer-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;