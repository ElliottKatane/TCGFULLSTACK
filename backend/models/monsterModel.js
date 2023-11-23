const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
  image: String,
  name: { type: String, required: true },
  //reference au mapLevel dans collection levels
  mapLevel: { type: Number, required: true },
  health: { type: Number, required: true },
  loot: { type: Array, required: true },
  attacks: { type: Array, required: true },
});

module.exports = mongoose.model("Monsters", monsterSchema, "monsters");
