const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  rarity: { type: String, required: true },
  type: { type: String, required: true }, // can be : attack, skill, power. Defense cards are "skill"
  value: { type: Number, required: true },
  cost: { type: Number, required: true },
  imageURL: { type: String },
  // Upgrade
  upgradedValue: { type: Number },
  upgradedImageURL: { type: String },
});

module.exports = mongoose.model("Card", cardSchema);
