const app = express();
import express from 'express';
import cors from 'cors';
import { superAdminRouter } from './Routes/superAdmin.route.js';
import mongoose from 'mongoose';
import 'dotenv/config';

import { adRouter } from './Routes/adApplication.route.js';
import subAdmin from './Routes/subAdmin.route.js';
import createNewsRoutes from "./Routes/createNews.route.js";


async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('ConnecAted to db');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

dbConnect();

app.use(express.json());
app.use(cors());

//body  parser setup
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/superAdmin', superAdminRouter);
app.use('/api/v1/subAdmin', subAdmin);
app.use('/api/v1/createAd', adRouter);
app.use("/api/v1/subAdmin", createNewsRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is Running');
});

