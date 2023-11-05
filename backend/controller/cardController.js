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
const getAllCardsWithCounts = async (req, res) => {
  try {
    const cards = await Card.find(); // Retrieve all documents from the 'Card' collection

    // Calculate the counts for each card type
    const skillCount = cards.filter(
      (card) => card.type.toLowerCase() === "skill"
    ).length;
    const attackCount = cards.filter(
      (card) => card.type.toLowerCase() === "attack"
    ).length;
    const powerCount = cards.filter(
      (card) => card.type.toLowerCase() === "power"
    ).length;

    // Create an object that includes the cards and the counts
    const response = {
      cards,
      skillCount,
      attackCount,
      powerCount,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Retrieve 5 random cards
const getRandomCards = async (req, res) => {
  try {
    const cardCount = await Card.countDocuments();
    const sampleSize = Math.min(5, cardCount); // Determine the sample size
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

module.exports = { createCard, getAllCardsWithCounts, getRandomCards };
