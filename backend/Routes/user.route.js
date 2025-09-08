import { Router } from "express";
import { createAdApplication } from "../Controllers/adsApplications.controller.js";
import { getArticles } from "../Controllers/fetchNews.controller.js";


const userRouter = Router();

userRouter.get("/:category",getArticles)
userRouter.post("/createAd",createAdApplication)

export {userRouter}