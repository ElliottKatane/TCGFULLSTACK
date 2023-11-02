const express = require("express");
const router = express.Router();

// Define a route to fetch the "Combat" component based on the selected mapLevel
router.get("/combat/:mapLevel", (req, res) => {
  // You can handle the request for the "Combat" component here
  const mapLevel = req.params.mapLevel;
  // Render the "Combat" component or perform any necessary actions
  res.send(`Loading Combat component for mapLevel ${mapLevel}`);
});

module.exports = router;
