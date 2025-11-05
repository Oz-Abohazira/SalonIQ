import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import serviceModel from "../models/serviceModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API to add service
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

    if (!imageFile) {
      return res.json({ success: false, message: "Image file is required" });
    }

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

    return res.json({ success: true, message: "Service Added !" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
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
      return res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get all services
const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    return res.json({ success: true, services });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    return res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentID);

    await appointmentModel.findByIdAndUpdate(appointmentID, {
      is_canceled: true,
    });

    // Removing booked time from the service object
    const { serviceID, slotDate, slotStart, slotEnd } = appointmentData;
    const serviceData = await serviceModel.findById(serviceID);

    let slotsBooked = serviceData.slotsBooked;

    slotsBooked[slotDate] = slotsBooked[slotDate].filter(
      (item) => item.startTime !== slotStart && item.endTime !== slotEnd
    );

    await serviceModel.findByIdAndUpdate(serviceID, { slotsBooked });

    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { addService, loginAdmin, getAllServices, getAllAppointments, cancelAppointment };
