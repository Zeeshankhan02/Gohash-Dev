import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubAdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subAdmin/login`,
        { email: formData.email, password: formData.password }
      );

      localStorage.setItem("subAdminToken", res.data.token);
      navigate("create-news");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        {/* Title */}
        <h3
          className="text-center mb-3 fw-bold"
          style={{ color: "#e74c3c" }}
        >
          Sub Admin Login
        </h3>
        <p className="text-center text-muted small mb-4">
          Please login to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold small">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold small">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="form-control rounded-3"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn fw-bold rounded-3"
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                color: "#fff",
              }}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p
          className="text-center mt-3 text-muted"
          style={{ fontSize: "0.85rem" }}
        >
          © 2025 Gohash SubAdmin Portal
        </p>
      </div>
    </div>
  );
}

export default SubAdminLogin;
