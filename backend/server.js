const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/cardForm");
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

// méthode login
app.post(
  "/login",
  (loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);

      // create a token
      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
);

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));

// fct de test pour afficher hello
app.get("/", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tcg-front-six.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
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
