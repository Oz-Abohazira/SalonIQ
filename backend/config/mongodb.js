import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Database is Connected")
  );

  await mongoose.connect(`${process.env.MODGODB_URI}/saloniq`);
};

export default connectDB;
