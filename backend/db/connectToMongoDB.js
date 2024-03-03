import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB is Connected`.bgGreen);
  } catch (error) {
    console.log(`MongoDB is Not Connected`.bgRed);
  }
};
export default connectToMongoDB;
