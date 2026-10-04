import mongoose from "mongoose";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};



export default connectDB;