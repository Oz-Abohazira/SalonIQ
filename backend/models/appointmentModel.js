import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  serviceID: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotStart: { type: String, required: true },
  slotEnd: { type: String, required: true },
  userData: { type: Object, required: true },
  serviceData: { type: Object, required: true },
  price: { type: Number, required: true },
  create_date: { type: Number },
  is_canceled: { type: Boolean, default: false },
  is_payed: { type: Boolean, default: false },
  is_completed: { type: Boolean, default: false },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
