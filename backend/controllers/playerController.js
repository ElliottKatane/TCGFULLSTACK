const User = require("../models/userModel");

const getPlayerData = async (req, res) => {
  // récupère toutes les infos du joueur : HP, gold, cartes, etc.
  try {
    const userEmail = req.params.userEmail;
    // terminal dans VSCode
    console.log(`Fetching player data for user with email: ${userEmail}`);

    const user = await User.findOne({ email: userEmail }).populate({
      path: "player",
      populate: {
        path: "DeckOfCards.card",
        model: "Card",
      },
    });

    if (!user || !user.player) {
      return res.status(404).json({ message: "Player not found for the user" });
    }

    const playerData = user.player.toObject();
    res.json(playerData);
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getPlayerData };
