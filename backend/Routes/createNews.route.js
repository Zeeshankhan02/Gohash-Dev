// routes/createNews.routes.js
import express from "express";
import { createNews } from "../Controllers/createNews.controller.js"; 

import { verifyToken } from "../Middlewares/createNewsAuth.js";

const router = express.Router();

// Protected route
router.post("/createNews", verifyToken, createNews);

export default router;
