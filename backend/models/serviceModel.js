import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
    repeatEvery: { type: String, required: true },
    duration: { type: String, required: true },
    durationInMinutes: { type: Number, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    create_date: { type: Number },
    slotsBooked: { type: Object, default: {} },
  },
  { minimize: false }
);

const serviceModel =
  mongoose.models.service || mongoose.model("service", serviceSchema);

export default serviceModel;
