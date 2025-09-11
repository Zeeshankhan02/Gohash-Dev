// controllers/createNews.controller.js
import { createNewsModel } from "../Models/createNews.model.js";
import { subAdminModel } from "../Models/subAdmin.model.js";
import jwt from "jsonwebtoken";

// JWT verification middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

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
