const express = require("express");
const router = express.Router();
const { getPlayerData } = require("../controllers/playerController");

// Assuming you have a parameter named userId in your route
router.get("/profile/:userEmail", getPlayerData);

module.exports = router;
