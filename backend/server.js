const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/cardForm");
const path = require("path");
const Level = require("./models/levelModel");
const Monstres = require("./models/monstreModel");
const levelController = require("./controller/levelController");
const monsterController = require("./controller/monsterController");

//express app
const app = express();

// middleware
app.use(express.static(path.join(__dirname, "frontend", "src", "assets")));
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
app.use(cors());
// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);
app.use("/api/card-form", cardRoutes);
app.use("/api", require("./routes/levelRoute"));
app.use("/api", require("./routes/monstreRoute"));

app.get(
  "/api/levels/:mapLevel/backgroundImage",
  levelController.getLevelBackgroundImage
);
app.get(
  "/api/monstres/mapLevel/:mapLevel",
  monsterController.getMonstersByMapLevel
);

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
