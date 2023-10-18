const express = require("express");
const router = express.Router();

// Import your controller functions for cards
const { createCard, getAllCards } = require("../controller/cardController");
// Create a new card
router.post("/createcard", createCard);
router.get("/getcards", getAllCards);

module.exports = router;
