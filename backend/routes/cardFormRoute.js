const express = require("express");
const router = express.Router();

// Controller functions for cards
const {
  createCard,
  getRandomCards,
  getAllCardsWithCounts,
  getAllCards,
  findCardByName,
} = require("../controllers/cardController");

// Create a new card
router.post("/createcard", createCard);
// Retrieve all cards (used in /createcard under the form)
router.get("/getcards", getAllCardsWithCounts);
// Retrieve 5 random cards, displayed in Combat.js / Cardboard.js
router.get("/getRandomCards", getRandomCards);
// Retrieve all cards, displayed in CardList.js
router.get("/getAllCards", getAllCards);
// Get card by name
router.get("/findCardByName/:name", findCardByName);

module.exports = router;
