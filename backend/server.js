/* global process */
/* eslint-disable no-unused-vars */

// Import required packages and modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const admin = require('firebase-admin');
var serviceAccount = require("./permissions.json");

require("dotenv").config();

const connectDB = require("./config/db");
const seedDatabase = require("./utils/seed");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cressey.firebaseio.com"
});

// Define the port on which the server will run
const port = process.env.PORT || 5004;

// Create the Express application
const app = express();

var corsOptions = {
  origin: [
    true,
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

if (process.env.NODE_ENV === "development") {
  corsOptions.origin.push("http://localhost:3000");
  corsOptions.origin.push("http://192.168.2.172:3000");
}

// Enable cross-origin resource sharing
app.use(cors(corsOptions));

// Parse incoming JSON data
app.use(express.json());
// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

// Define routes for the API
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tags", require("./routes/tagRoute"));
app.use("/api/collections", require("./routes/collectionRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/exercises", require("./routes/exerciseRoute"));
app.use("/api/equipments", require("./routes/equipmentRoute"));
app.use("/api/quizzes", require("./routes/quizRoute"));
app.use("/api/intros", require("./routes/introRoute"));

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
