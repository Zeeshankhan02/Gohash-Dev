import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuperAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin`,
        { username, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("dashboard");
      alert(res.data.msg);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "360px",
          width: "100%",
          borderTop: "4px solid #dc3545",
          borderRadius: "12px",
        }}
      >
        {/* Title */}
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#dc3545" }}>
          🔑 Super Admin Login
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="off"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="off"
              required
            />
          </div>

          {/* Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger fw-bold rounded-3"
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
          © Gohash SuperAdmin Portal
        </p>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
