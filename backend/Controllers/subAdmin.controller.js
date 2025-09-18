import { subAdminModel } from "../Models/subAdmin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios"
import { createNewsModel } from "../Models/createNews.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.util.js";
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
      { id: subAdmin._id,},
      process.env.JWT_SECRET, // use .env
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


// Upload controller for SubAdmin
// export const uploadMedia = async (req, res) => {
//   try {
//     // Multer should provide req.file
//     if (!req.file) {
//       return res.status(400).json({ success: false, msg: "Video file not selected" });
//     }

//     // Upload to Cloudinary
//     const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
//     if (!cloudinaryResponse) {
//       return res.status(500).json({ success: false, msg: "Upload to Cloudinary failed" });
//     }

//     const videoUrl = cloudinaryResponse.secure_url;
//     console.log(videoUrl);
    

//     // 2. Trigger Make.com webhook using axios
//     const payload = {
//       title: req.body.title || "Untitled Video",
//       description: req.body.description || "No description",
//       videoUrl: videoUrl, // Cloudinary direct URL
//     };

//     console.log("playload: ",payload);
    
//     const makeResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, payload, {
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log(makeResponse);
    

//     // 3. Send response back to frontend
//     res.status(200).json({
//       success: true,
//       message: "Video uploaded & webhook triggered successfully",
//       videoUrl,
//       public_id: cloudinaryResponse.public_id,
//     });
    
//   } catch (error) {
//     console.error("Upload Error:", error);
//     // return res.status(500).json({ success: false, msg: "Internal Server Error" });
//     return res.status(500).send(error.response.data)
//   }
// };
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "Video file not selected" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      return res.status(500).json({ success: false, msg: "Upload to Cloudinary failed" });
    }

    const videoUrl = cloudinaryResponse.secure_url;
    const payload = {
      title: req.body.title || "Untitled Video",
      description: req.body.description || "No description",
      videoUrl,
      type: req.body.type
    };

    // Call Make.com
    const makeResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Save to DB
    const news = new createNewsModel({
      title: payload.title,
      description: payload.description,
      youtubeIframe: `https://www.youtube.com/watch?v=${makeResponse.data.youtube.videoId}`,
      type: payload.type,
      createdBy: req.user.id, // ✅ Use JWT user
      cloudinaryUrl: videoUrl,
      public_id: cloudinaryResponse.public_id // ✅ Store for deletion later
    });

    await news.save();

    return res.status(201).json({
      msg: payload.type === "ads" ? "Ad created successfully and uploaded to all socials" : "News created successfully and uploaded to all socials",
      news
    });

  } catch (error) {
    console.error("Upload Error:", error);

    // Cleanup Cloudinary file if something fails
    if (req.file?.path) {
      try {
        await deleteOnCloudinary(req.file.path);
      } catch (err) {
        console.error("Cloudinary cleanup failed:", err);
      }
    }

    return res.status(500).json({ success: false, msg: "Internal Server Error" });
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