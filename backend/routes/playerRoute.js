const express = require("express");
const router = express.Router();
const { updateLevelReached } = require("../controllers/playerController");
const { getPlayerData } = require("../controllers/playerController");

// Assuming you have a parameter named userId in your route
router.get("/profile/:userEmail", getPlayerData);
router.post("/update-level", updateLevelReached);

module.exports = router;
