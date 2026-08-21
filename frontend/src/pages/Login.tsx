import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          password: data.message || "Invalid email or password",
        });
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      setErrors({
        password: "Cannot connect to backend.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow"></div>

      <div className="auth-card">

        <Link to="/" className="auth-logo">
          <span className="logo-icon">🌉</span>
          <span className="logo-text">FoodBridge AI</span>
        </Link>

        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">
          Log in to continue rescuing food
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-row">

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              Remember Me
            </label>

            <Link className="forgot-link" to="#">
              Forgot Password?
            </Link>

          </div>

          <button
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>

        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;