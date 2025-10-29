import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import serviceModel from "../models/serviceModel.js";
import jwt from "jsonwebtoken";

const addService = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "category",
      "repeatEvery",
      "duration",
      "durationInMinutes",
      "price",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    console.log(requiredFields.filter((field) => req.body[field]));

    if (missingFields.length > 0) {
      console.log(`Missing required fields: ${missingFields.join(", ")}`);
      return res.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const {
      name,
      available,
      category,
      repeatEvery,
      duration,
      durationInMinutes,
      price,
      description,
    } = req.body;

    const imageFile = req.file;

    // // Validators
    // if (!validator.isEmail(email)) {
    //   return res.json({
    //     success: false,
    //     message: "Please Enter a Valid Email",
    //   });
    // }

    // if (password.length < 6) {
    //   return res.json({
    //     success: false,
    //     message: "Password length must exceed 6 characters",
    //   });
    // }

    if (!imageFile) {
      return res.json({ success: false, message: "Image file is required" });
    }

    // // Encrypting password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // save data to database
    const serviceData = {
      name,
      // email,
      // password: hashedPassword,
      available,
      category,
      image: imageUrl,
      repeatEvery,
      duration,
      durationInMinutes,
      price,
      description,
      dacreate_date: Date.now(),
    };

    const newService = new serviceModel(serviceData);

    await newService.save();

    res.json({ success: true, message: "Service Added !" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Email or password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    // Example on how to remove a field from response
    // const services = await serviceModel.find({}).select('-password')
    const services = await serviceModel.find({});
    res.json({ success: true, services });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addService, loginAdmin, getAllDoctors };
