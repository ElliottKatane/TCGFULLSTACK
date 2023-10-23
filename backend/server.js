const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/cardForm");
const path = require("path");
const Level = require("./models/levelModel");
const Monstres = require("./models/monstreModel");

//express app
const app = express();

// middleware
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
app.use(cors());

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend/build")));

//routes
app.use("/api/user", userRoutes);
app.use("/api/card-form", cardRoutes);
app.use("/api", require("./routes/levelRoute"));

app.get("/api/levels/:mapLevel/backgroundImage", async (req, res) => {
  const mapLevel = req.params.mapLevel;

  try {
    const level = await Level.findOne({ mapLevel });

    if (!level) {
      return res.status(404).json({ error: "Level not found" });
    }

    const backgroundImagePath = level.backgroundImage;

    // Read the image file and send it as a response
    const fs = require("fs");
    const pathToImage = path.join(
      __dirname,
      "..",
      "frontend",
      "src",
      "assets",
      backgroundImagePath
    );

    fs.readFile(pathToImage, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.setHeader("Content-Type", "image/png"); // Adjust the content type based on your image type
      res.end(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/Monstres/mapLevel/:mapLevel", async (req, res) => {
  const mapLevel = req.params.mapLevel;

  try {
    // Query the "Monstres" collection based on the selected map level
    const monsters = await Monstres.find({ mapLevel: mapLevel });

    // Return the monsters as JSON
    res.json(monsters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
