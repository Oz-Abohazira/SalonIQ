import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    mongoose.connection.on("connected", () =>
      console.log("Database is Connected")
    );

    await mongoose.connect(`${process.env.MODGODB_URI}/saloniq`, {
      bufferCommands: false,
    });
    
    isConnected = true;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default connectDB;