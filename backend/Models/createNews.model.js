import mongoose from "mongoose";

const createNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeIframe: { type: String, default: null },
  type: { type: String, enum: ["general", "dailyBulletin","ads"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "subAdmin", required: true },
}, { timestamps: true });

export const createNewsModel = mongoose.model("createNews", createNewsSchema);
