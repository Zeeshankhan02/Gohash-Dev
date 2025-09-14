import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";
import "dotenv/config";

import { superAdminRouter } from "../Routes/superAdmin.route.js";
import { userRouter } from "../Routes/user.route.js";
import subAdmin from "../Routes/subAdmin.route.js";
import createNewsRoutes from "../Routes/createNews.route.js";

const app = express();
const FE_URL = process.env.FRONTEND_URL

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: FE_URL,           // frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
    credentials: true,        // if using cookies / auth headers
  })
);
app.use(express.urlencoded({ extended: true }));

// DB connection
async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
dbConnect();

// Routes
app.use("/api/v1/superAdmin", superAdminRouter);
app.use("/api/v1/subAdmin", subAdmin);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subAdmin", createNewsRoutes);


app.get('/',(req,res)=>{
  res.json({
    msg:"The backend is working properly"
  })
})


export default serverless(app);
