import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const subAdminSchema = new Schema({
  fullname: { 
    type: String,
    required: true
     },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password:{
      type: String, 
      required: true
  }

});


subAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const subAdminModel = model("SubAdmin", subAdminSchema);

