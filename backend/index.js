import express from "express";
import cors from "cors";
import { superAdminRouter } from "./Routes/superAdmin.route.js";
import mongoose from "mongoose";

import "dotenv/config";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

dbConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

app.use("/api/v1/superAdmin", superAdminRouter);

app.listen(3000, () => {
  console.log("Server is Running");
});
