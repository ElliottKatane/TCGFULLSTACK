const User = require("../models/userModel");
const Player = require("../models/playerModel"); // Import Player model

const getPlayerData = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    
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

// Controller method for updating the levelReached field
const updateLevelReached = async (req, res) => {
  const { userEmail, newLevelReached } = req.body;
  
  console.log("Received request to update level for user:", userEmail);
  
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      { emailUser: userEmail },
      { $set: { levelReached: newLevelReached } },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ message: "LevelReached updated successfully", player: updatedPlayer });
  } catch (error) {
    console.error("Error updating levelReached:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  updateLevelReached,
  getPlayerData
};
