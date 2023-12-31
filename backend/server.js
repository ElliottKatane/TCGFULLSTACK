const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const cardRoutes = require("./routes/cardFormRoute");
const levelRoute = require("./routes/levelRoute");
const monstreRoute = require("./routes/monstreRoute");
const levelController = require("./controller/levelController");
const monsterController = require("./controller/monsterController");
const path = require("path");
//express app
const app = express();

// middleware
app.use(express.static(path.join(__dirname, "frontend", "src", "assets")));
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
app.use(
  cors({
    origin: "https://tcg-front-six.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));

// fct de test pour afficher hello
app.get("/", (req, res) => {
  res.json("Hello");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/card-form", cardRoutes);
app.use("/api/levels", levelRoute);
app.use("/api/monstres", monstreRoute);

app.get(
  "/api/levels/:mapLevel/backgroundImage",
  levelController.getLevelBackgroundImage
);
app.get(
  "/api/monstres/:mapLevel/image",
  monsterController.getMonstersByMapLevel
);

mongoose
  .connect(process.env.MONGODB_URI)
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
