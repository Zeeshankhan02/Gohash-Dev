import { Router } from "express";
import { superAdminAuth } from "../Middlewares/superAdminAuth.js";
import {
  createSubAdmins,
  deleteSubAdmin,
  listSubAdmins,
  superAdminLogin,
  viewAdsApplication,
} from "../Controllers/superAdmin.controller.js";

const superAdminRouter = Router();

superAdminRouter.post("/", superAdminLogin);

//Authenticated Routes
superAdminRouter.get("/listSubAdmins", superAdminAuth, listSubAdmins);
superAdminRouter.post("/createSubAdmins", superAdminAuth, createSubAdmins);
superAdminRouter.delete(
  "/deleteSubAdmins/:subAdminId",
  superAdminAuth,
  deleteSubAdmin
);
superAdminRouter.get("/viewAdsApplications", superAdminAuth, viewAdsApplication);

export { superAdminRouter };
