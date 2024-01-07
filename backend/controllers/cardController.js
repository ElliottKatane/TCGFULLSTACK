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
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find(); // Retrieve all documents from the 'Card' collection
    const response = {
      cards,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve 2 reward cards
const getRewardCards = async (req, res) => {
  try {
    const playerLevel = req.params.mapLevel; // Récupérer le niveau du joueur à partir des paramètres de la requête
    console.log("playerLevel", playerLevel);
    const levelCardCategories = {
      1: ["Conflit", "Frappe", "Coup de boule"],
      2: ["Charge imprudente", "Défense", "Frappe double"],
      3: ["Même pas mal", "Combustion", "Frappe"],
      4: ["Conflit", "Colère", "Enflammer"],
      5: ["Conflit", "Frappe", "Coup de boule"],
      6: ["Conflit", "Frappe", "Coup de boule"],
      7: ["Conflit", "Frappe", "Coup de boule"],
      8: ["Conflit", "Frappe", "Coup de boule"],
      9: ["Conflit", "Frappe", "Coup de boule"],
      10: ["Conflit", "Frappe", "Coup de boule"],
    };
    // Get the card categories for the player's level
    const cardCategories = levelCardCategories[playerLevel] || [];
    // Define the sample size (you can set it to any value)
    const sampleSize = Math.min(3, cardCategories.length);
    // Log the card categories for debugging
    console.log("Card Categories for Level", playerLevel, ":", cardCategories);
    // Retrieve 2 random cards from the specified categories
    console.log("MongoDB Query:", [
      { $match: { name: { $in: cardCategories } } },
      { $sample: { size: sampleSize } },
    ]);
    const randomCards = await Card.aggregate([
      { $match: { name: { $in: cardCategories } } }, // Filter by card categories
      { $sample: { size: sampleSize } }, // Récupérer 3 cartes au hasard parmi les catégories filtrées
    ]);
    console.log("Random Cards:", randomCards);
    res.status(200).json(randomCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const findCardByName = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: 'Le paramètre "name" est requis' });
  }

  try {
    // Utilisez votre modèle de carte pour rechercher la carte dans la base de données
    const card = await Card.findOne({ name });

    if (!card) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = {
  createCard,
  getAllCardsWithCounts,
  getRewardCards,
  getAllCards,
  findCardByName,
};
