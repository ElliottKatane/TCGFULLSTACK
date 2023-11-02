const mongoose = require("mongoose");

const monstresSchema = new mongoose.Schema({
  nom: String,
  Attaques: [
    {
      griffes: {
        // Define the structure of "griffes" here
        // Example: name, damage, type, etc.
      },
      morsures: {
        // Define the structure of "morsures" here
        // Example: name, damage, type, etc.
      },
    },
    // Add more attack types if needed
  ],
  HP: Number,
  image: String,
  //reference au mapLevel dans collection levels
  mapLevel: {
    type: Number, // Data type for mapLevel (you can change this to match your data)
    required: true, // Map level is required for each level
  },
});

const monstres = mongoose.model("Monstres", monstresSchema);

module.exports = monstres;
