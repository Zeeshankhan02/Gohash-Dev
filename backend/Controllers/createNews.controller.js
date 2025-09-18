// controllers/createNews.controller.js
import { createNewsModel } from "../Models/createNews.model.js";
import { subAdminModel } from "../Models/subAdmin.model.js";


// SubAdmin creates news
export const createNews = async (req, res) => {
  try {
    const { title, description, youtubeIframe, type } = req.body;

    // Validation
    if (!title || !description || !type) {
      return res.status(400).json({ msg: "Title, content, and type are required" });
    }

    // Only allow specific types
    if (!["general", "dailyBulletin","ads"].includes(type)) {
      return res.status(400).json({ msg: "Invalid news type" });
    }

    // Check if subAdmin exists
    const subAdmin = await subAdminModel.findById(req.user.id);
    if (!subAdmin) return res.status(404).json({ msg: "SubAdmin not found" });

    const news = new createNewsModel({
      title,
      description,
      youtubeIframe,
      type,                // ← Type added
      createdBy: subAdmin._id 
    });

    await news.save();
    type=="ads"?res.status(201).json({ msg: "Ad created successfully", news }):res.status(201).json({ msg: "News created successfully", news });
  } catch (err) {
    console.error("Create News Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
