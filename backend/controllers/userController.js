import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Validating Request Input
    if (!name || !email || !password || !phone) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a Valid Email" });
    }

    if (!validator.isMobilePhone(phone)) {
      return res.json({
        success: false,
        message: "Enter a Valid Phone Number",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password is too short. must be 6 digits",
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      phone,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email or Password are incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token, name: user.name });
    } else {
      return res.json({
        success: false,
        message: "Email or Password are incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API for user Data
const getUserData = async (req, res) => {
  try {
    const userID = req.userID;

    const userData = await userModel.findById(userID).select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to update user data
const updateUserData = async (req, res) => {
  try {
    const userID = req.userID;
    const { name, phone, gender, dob } = req.body;

    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    await userModel.findByIdAndUpdate(userID, { name, phone, gender, dob });

    // Handling image only if exists
    const imageFile = req.file;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userID, { image: imageUrl });
    }

    return res.json({ success: true, message: "User Profile Updated" });
    
  } catch (error) {}
};

export { registerUser, loginUser, getUserData, updateUserData };
