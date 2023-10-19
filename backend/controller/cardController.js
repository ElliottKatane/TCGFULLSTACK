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

// Retrieve all cards
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find(); // This will retrieve all documents from the 'Card' collection
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRandomCards = async (req, res) => {
  try {
    const cardCount = await Card.countDocuments();
    const sampleSize = Math.min(7, cardCount); // Determine the sample size (up to 5)

    const randomCards = await Card.aggregate([
      { $sample: { size: sampleSize } }, // Retrieve random cards based on the sample size
    ]);

    // Log each card as it's retrieved
    randomCards.forEach((card, index) => {
      console.log(`Card ${index + 1}:`, card);
    });

    res.status(200).json(randomCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCard, getAllCards, getRandomCards };
