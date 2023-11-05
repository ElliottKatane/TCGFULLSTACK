const express = require("express");
const router = express.Router();
const Level = require("../models/levelModel"); // Import your Mongoose model

// Define a route to fetch levels based on the selected mapLevel
router.get("/levels/:mapLevel", async (req, res) => {
  const selectedMapLevel = req.params.mapLevel; // Access the mapLevel parameter

  try {
    // Query the levels collection based on the selected mapLevel
    const levels = await Level.find({ mapLevel: selectedMapLevel });

    // Return the levels as JSON
    res.json(levels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
