
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/cressey-fitness";

const connectDB = async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Mongoose Connected");
};

module.exports = connectDB;
