const express = require("express");
const router = express.Router();

// Import your controller functions for cards
const { createCard } = require("../controller/cardController");

// Create a new card
router.post("/createcard", createCard);

module.exports = router;
