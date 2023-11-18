const express = require("express");
const router = express.Router();

// Controller functions for cards
const {
  createCard,
  getRandomCards,
  getAllCardsWithCounts,
} = require("../backend/controller/cardController");

// Create a new card
router.post("/createcard", createCard);
// Retrieve all cards (used in /createcard under the form)
router.get("/getcards", getAllCardsWithCounts);
// Retrieve 5 random cards, displayed in Combat.js / Cardboard.js
router.get("/getRandomCards", getRandomCards);

module.exports = router;
