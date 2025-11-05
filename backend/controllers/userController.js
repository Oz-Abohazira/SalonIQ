import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import serviceModel from "../models/serviceModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Validating Request Input
    if (!name || !email || !password || !phone) {
      return res.json({ success: false, message: "Missing required fields" });
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
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to find available times
const getAvailableTimes = async (req, res) => {
  try {
    const { slotDate, dayTimes } = req.body;
    const allServices = await serviceModel.find({});

    let availableTimes = dayTimes.map((item) => ({
      time: item.time,
      available: true,
    }));

    for (const service of allServices) {
      const slotsBooked = service.slotsBooked || [];

      if (slotsBooked[slotDate]) {
        for (const bookedSlot of slotsBooked[slotDate]) {
          const { startTime, endTime } = bookedSlot;

          availableTimes = availableTimes.map((item) => {
            if (item.available) {
              const slotStart = item.time;

              const available = isTimeAvailable(
                slotStart,
                "",
                startTime,
                endTime
              );

              return { ...item, available };
            } else {
              return { ...item };
            }
          });
        }
      }
    }

    return res.json({ success: true, availableTimes });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userID = req.userID;
    const { serviceID, slotDate, slotStart, slotEnd } = req.body;

    const allServices = await serviceModel.find({});
    const serviceData = allServices.find(
      (item) => item._id.toString() === serviceID
    );
    const userData = await userModel.findById(userID).select("-password");

    if (!serviceData) {
      return res.json({ success: false, message: "Service not found" });
    }

    if (!serviceData.available) {
      return res.json({ success: false, message: "Service is not Available" });
    }

    for (const service of allServices) {
      const slotsBooked = service.slotsBooked || {};

      if (slotsBooked[slotDate]) {
        for (const bookedSlot of slotsBooked[slotDate]) {
          if (
            !isTimeAvailable(
              slotStart,
              slotEnd,
              bookedSlot.startTime,
              bookedSlot.endTime
            )
          ) {
            return res.json({
              success: false,
              message: "Time is already booked, try another",
            });
          }
        }
      }
    }

    // Add the new slot to booked slots
    let slotsBooked = serviceData.slotsBooked || {};

    if (slotsBooked[slotDate]) {
      slotsBooked[slotDate].push({ startTime: slotStart, endTime: slotEnd });
    } else {
      slotsBooked[slotDate] = [{ startTime: slotStart, endTime: slotEnd }];
    }

    // Create clean service data for appointment (without slotsBooked)
    const { slotsBooked: _, ...serviceDataClean } = serviceData.toObject();

    const appointmentData = {
      userID,
      serviceID,
      slotDate,
      slotStart,
      slotEnd,
      userData,
      serviceData: serviceDataClean,
      price: serviceData.price,
      create_date: Date.now(),
    };

    // Save appointment and update service slots in parallel
    const [newAppointment] = await Promise.all([
      new appointmentModel(appointmentData).save(),
      serviceModel.findByIdAndUpdate(serviceID, { slotsBooked }),
    ]);

    return res.json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get user appointments
const getUserAppointments = async (req, res) => {
  try {
    const userID = req.userID;
    const appointments = await appointmentModel.find({ userID });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const userID = req.userID;
    const { appointmentID } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentID);

    // Verify appointment user
    if (userID !== appointmentData.userID)
      return res.json({ success: false, message: "Unauthorized Action" });

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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.ROZORPAY_KEY_SECRET,
});
// API for online payment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentID } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentID);

    if (!appointmentData || appointmentData.is_canceled)
      return res.json({
        success: false,
        message: "Appointment Canceled or Not Found",
      });

    // Creating options for razorpay payment
    const options = {
      amount: appointmentData.price * 100,
      currency: "USD",
      receipt: appointmentID,
    };

    // Create order
    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error });
  }
};

// API to verify payment
const verifyPaymentRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    console.log(req.body.razorpay_order_id);
    

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      // Update appointment to paid
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        is_paid: true,
      });

      return res.json({ success: true, message: "Payment Successful" });
    } else {
      return res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error });
  }
};

// ---- Helper Functions ----

const isTimeAvailable = (slotStart, slotEnd, startTime, endTime) => {
  let convStart = convertToDecValue(slotStart);

  if (slotEnd === "") {
    slotEnd = slotStart;
  }
  let convEnd = convertToDecValue(slotEnd);

  let convBookedStart = convertToDecValue(startTime);
  let convBookedEnd = convertToDecValue(endTime);

  return convEnd < convBookedStart || convStart > convBookedEnd;
};

const convertToDecValue = (timeInHHMMPM) => {
  let hourVal = timeInHHMMPM.split(":")[0];
  let minVal = timeInHHMMPM.split(":")[1];
  let ampmVal = timeInHHMMPM.split(" ")[1];

  if (ampmVal === "PM" && hourVal !== "12") {
    hourVal = Number(hourVal) + 12;
  }

  return hourVal.toString() + minVal;
};

export {
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
  bookAppointment,
  getAvailableTimes,
  getUserAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyPaymentRazorpay,
};
