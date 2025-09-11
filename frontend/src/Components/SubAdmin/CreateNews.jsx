import axios from "axios";
import { useState } from "react";

function CreateNews() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    // resourceType: "image",
    newsType: "general",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
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
        // resourceType: "image",
        newsType: "general",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-start py-5 bg-light min-vh-100">
      <div
        className="card shadow-lg p-5"
        style={{ maxWidth: "650px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-danger">
          Create News
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control border border-danger shadow-sm"
              placeholder="Enter news title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="form-control border border-danger shadow-sm"
              placeholder="Enter news description"
              required
            />
          </div>

          {/* Link */}
          <div className="mb-3">
            <label htmlFor="link" className="form-label fw-semibold">
              Link
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="form-control border border-danger shadow-sm"
              placeholder="Paste YouTube link"
              required
            />
          </div>

          {/* Resource Type */}
          {/* <div className="mb-3">
            <label className="form-label fw-semibold">Resource Type</label>
            <select
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
              className="form-select border border-danger shadow-sm"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div> */}

          {/* News Type */}
          <div className="mb-4">
            <label className="form-label fw-semibold">News Type</label>
            <select
              name="newsType"
              value={formData.newsType}
              onChange={handleChange}
              className="form-select border border-danger shadow-sm"
            >
              <option value="general">General</option>
              <option value="dailyBulletin">Headline</option>
              <option value="ad">Ad</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger btn-lg fw-bold shadow-sm"
            >
              Create News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
