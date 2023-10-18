const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/cardForm");

//express app
const app = express();

// middleware
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
app.use(cors());

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' folder

//routes
app.use("/api/user", userRoutes);
app.use("/api/card-form", cardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });

app.on("error", (err) => {
  console.error("Express server error:", err);
});
