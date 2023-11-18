// express.Router() is a function that returns a router object. This object has methods like .get() and .post() that we can use to create routes. We can then export this router object and import it into our server.js file.
const express = require("express")();
const app = express();
const { v4 } = require("uuid");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// routes
const userRoutes = require("user");
const cardRoutes = require("cardForm");
const levelRoute = require("levelRoute");
const monstreRoute = require(".monstreRoute");
const levelController = require("levelController");
const monsterController = require("monsterController");

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

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
// Export the Express API
module.exports = app;
