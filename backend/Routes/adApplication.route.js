import { Router } from "express";
import { createAdApplication } from "../Controllers/adsApplications.controller.js";


const adRouter = Router();

adRouter.post("/",createAdApplication)

export {adRouter}