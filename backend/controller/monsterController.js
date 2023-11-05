const monstres = require("../models/monstreModel");

// Function to get monsters by mapLevel
exports.getMonstersByMapLevel = async (req, res) => {
  const mapLevel = req.params.mapLevel;

  try {
    // Query the "Monstres" collection based on the selected map level
    const monsters = await monstres.find({ mapLevel });

    // Return the monsters as JSON
    res.json(monsters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
