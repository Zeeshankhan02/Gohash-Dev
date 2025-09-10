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
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderTop: "5px solid #dc3545" }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#dc3545" }}>
          Sub Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger fw-bold"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          © Gohash SubAdmin Portal
        </p>
      </div>
    </div>
  );
}

export default SubAdminLogin;
