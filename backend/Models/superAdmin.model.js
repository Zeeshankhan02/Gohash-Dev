import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const superAdminSchema = new Schema({
  username: String,
  password: String,
});

superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const superAdminModel = model("SuperAdmin", superAdminSchema);
