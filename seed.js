const mongoose = require("mongoose");
const State = require("./models/State");

const {
  parsed: { MONGODB_URI = "mongodb://localhost/states" },
} = require("dotenv").config();

// Data array containing seed data
var data = require("./public/json/states.json");

// Connect to MongoDB via Mongoose
mongoose.connect(MONGODB_URI);

const seedDB = async () => {
  await State.deleteMany({});
  await State.insertMany(data);
};

seedDB().then(() => mongoose.connection.close());
