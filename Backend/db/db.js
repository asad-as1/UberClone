const mongoose = require('mongoose');


const URI = process.env.DB_CONNECT;
const connectDB = async () => {
  try {
    const res = await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Error while connecting to the database", error);
  }
};


module.exports = connectDB;