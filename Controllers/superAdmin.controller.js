import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { subAdminModel } from "../Models/subAdmin.model.js";
import { superAdminModel } from "../Models/superAdmin.model.js";
import mongoose from "mongoose";

export const superAdminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const superAdmin = await superAdminModel.findOne({ username });

    if (!superAdmin) {
      return res.status(403).json({ msg: "SuperAdmin Not Found" });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(403).json({ msg: "Incorrect password" });
    }
    const id = superAdmin._id.toString();
    const token = jwt.sign(id, process.env.JWT_SECRET);

    // Return JSON with token
    return res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const listSubAdmins = async (req, res) => {
  try {
    const subAdmins = await subAdminModel.find();
    res.send({ listOfSubAdmins: subAdmins });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching subAdmins" });
  }
};

export const createSubAdmins = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const subAdmin = await subAdminModel.findOne({
      email,
    });

    if (subAdmin) {
      return res.status(400).json({
        msg: "SubAdmin already exits",
      });
    }
    const newSubAdmin = await subAdminModel.create({
      fullname,
      email,
      password,
    });

    if (!newSubAdmin) {
      return res.status(400).json({
        msg: "Error while creating Sub Admin",
      });
    }

    res.status(202).json({
      msg: "Sub Admin Created Successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Cannot create subAdmins at the moment" });
  }
};

export const deleteSubAdmin = async (req, res) => {
  const subAdminId = new mongoose.Types.ObjectId(req.params.subAdminId);

  try {
    const deleteSA = await subAdminModel.findByIdAndDelete(subAdminId);

    if (!deleteSA) {
      return res.status(400).json({
        msg: "Failed to Delete Sub Admin",
      });
    }
    res.status(200).json({
      msg: "Sub Admin Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Failed to Delete Sub Admin Internal Server Error",
      error: error,
    });
  }
};
