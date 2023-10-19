const Schema = mongoose.Schema;

const monsterSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  mapLevel: { type: Number, required: true },
  health: { type: Number, required: true },
  loot: { type: Array, required: true },
  attacks: { type: Array, required: true },
});
