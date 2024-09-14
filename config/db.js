const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Ensure the connection is awaited
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error.message);
    process.exit(1);  // Optionally, exit the process if the connection fails
  }
};

module.exports = connectDB;
