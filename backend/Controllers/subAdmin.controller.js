import { subAdminModel } from "../Models/subAdmin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createNewsModel } from "../Models/createNews.model.js";
export const loginPost = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Debugging logs
    // console.log("Email:", email);
    // console.log("Password from body:", password);

    // 1. Find user
    const subAdmin = await subAdminModel.findOne({ email });
    if (!subAdmin) {
      return res.status(404).json({ msg: "SubAdmin not found" });
    }

    // console.log("User from DB:", subAdmin);
    // console.log("Password in DB:", subAdmin.password);

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, subAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: subAdmin._id, email: subAdmin.email },
      process.env.JWT_SECRET, // use .env
      { expiresIn: "1h" }
    );

    // 4. Sending response
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: subAdmin._id,
        email: subAdmin.email,
        fullname: subAdmin.fullname,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
    
  }
};

export const viewNewsCreated = async (req,res) => {
  
  try {

    const allNewsArticles = await createNewsModel.find({
      createdBy:req.user.id,
      type: { $in: ["dailyBulletin", "general"] }
    })

    if (!allNewsArticles) return res.json({
      msg:"No articles found"
    })

    res.json({
      msg:"All news articles Fetched successfully",
      articlesCreated:allNewsArticles
    })
    
  } catch (error) {
    return res.josn({
      msg:"internal server error"
    })
  }


}


export const deleteNews = async (req,res) => {
  const {articleId} =req.params
  try {
    const deleteNews = await createNewsModel.findByIdAndDelete(articleId)

    if (!deleteNews) return res.status(400).json({
      msg:"Failed to delete"
    })

    res.status(200).json({
      msg:"deleted successfully",
      news:deleteNews
    })

  } catch (error) {
    res.status(500).json({
      msg:"Internal server error"
    })
  }
}