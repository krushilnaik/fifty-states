const mongoose = require("mongoose");
const { Schema } = mongoose;

const stateSchema = new Schema({
  state: {
    type: String,
    required: true,
    unique: true,
  },
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funFacts: [String],
  population: Number,
  nickname: String,
  admitted: Number,
  capital: String,
});

module.exports = mongoose.model("State", stateSchema);
