import axios from "axios";
import { useState } from "react";
import SubAdminNav from "./SubAdminNav";

function CreateNews() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    newsType: "general",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subAdmin/createNews`,
        {
          title: formData.title,
          description: formData.description,
          youtubeIframe: formData.link,
          type: formData.newsType,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("subAdminToken")}`,
          },
        }
      );
      alert(res.data.msg);
      setFormData({
        title: "",
        description: "",
        link: "",
        newsType: "general",
      });
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <SubAdminNav/>
    <div className="container-fluid d-flex justify-content-center align-items-center bg-light min-vh-100 py-3">
      <div
        className="card shadow-sm p-3 p-md-4 w-100"
        style={{
          maxWidth: "450px",
          borderRadius: "14px",
          border: "none",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            height: "5px",
            width: "100%",
            background: "linear-gradient(90deg, #dc3545, #dc3545)",
            borderRadius: "10px 10px 0 0",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Heading */}
        <h4
          className="text-center fw-bold mb-3"
          style={{ color: "#dc3545", fontSize: "1.3rem" }}
        >
          Create News
        </h4>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold small">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="News title"
              required
              style={{
                borderRadius: "8px",
                border: "1.5px solid #e0e0e0",
                padding: "8px 10px",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold small">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              placeholder="News description"
              required
              style={{
                borderRadius: "8px",
                border: "1.5px solid #e0e0e0",
                padding: "8px 10px",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* YouTube Link */}
          <div className="mb-3">
            <label htmlFor="link" className="form-label fw-semibold small">
              YouTube Link
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="form-control"
              placeholder="Paste link"
              required
              style={{
                borderRadius: "8px",
                border: "1.5px solid #e0e0e0",
                padding: "8px 10px",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* News Type */}
          <div className="mb-3">
            <label className="form-label fw-semibold small">News Type</label>
            <select
              name="newsType"
              value={formData.newsType}
              onChange={handleChange}
              className="form-select"
              style={{
                borderRadius: "8px",
                border: "1.5px solid #e0e0e0",
                padding: "8px 10px",
                fontSize: "0.9rem",
              }}
            >
              <option value="general">General</option>
              <option value="dailyBulletin">Headline</option>
              <option value="ads">Ad</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn fw-bold"
              disabled={loading}
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.95rem",
                padding: "10px",
                color: "#fff",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc3545")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateNews;
