const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const {
  parsed: { MONGODB_URI = "mongodb://localhost/states", PORT = 8080 },
} = require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (_req, res) => {
  res.status(200).json({ message: "hi" });
});

app.use(routes);

mongoose.connect(MONGODB_URI);
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
