import { Router } from "express";
import { createAdApplication } from "../Controllers/adsApplications.controller.js";
import { getArticles, sponsoredAds } from "../Controllers/users.controller.js";


const userRouter = Router();

userRouter.get("/:category",getArticles)
userRouter.get("/ads",sponsoredAds)
userRouter.post("/createAd",createAdApplication)

export {userRouter}