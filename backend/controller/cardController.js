const Card = require("../models/cardModel");

// for database
// Create a new card
const createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCard };
