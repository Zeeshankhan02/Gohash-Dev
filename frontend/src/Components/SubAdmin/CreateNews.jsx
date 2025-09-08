import axios from "axios";
import { useState } from "react";

function CreateNews() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    resourceType: "image",
    newsType: "general",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    // sending to backend
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/subAdmin/createNews`,
      { title:formData.title,
        description:formData.description,
        youtubeIframe:formData.link,
        type:formData.newsType,
       },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("subAdminToken")}`,
        },
      }
    );
    alert(res.data.msg);
    
  }

  return (
    <div>
      <h2>Create News</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <div>
          <label>
            Link:
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </label>

          <select
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <label>
          News Type:
          <select
            name="newsType"
            value={formData.newsType}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="dailyBulletin">Headline</option>
          </select>
        </label>

        <button type="submit">Create News</button>
      </form>
    </div>
  );
}

export default CreateNews;
