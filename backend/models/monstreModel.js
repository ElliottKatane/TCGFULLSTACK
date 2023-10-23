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
  mapLevel: Number,
});

const Monstres = mongoose.model("Monstres", monstresSchema);

module.exports = Monstres;
