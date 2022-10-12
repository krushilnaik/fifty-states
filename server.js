const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

const app = express();

// get the environment variables
const {
  parsed: { MONGODB_URI = "mongodb://localhost/states", PORT = 8080 },
} = require("dotenv").config();

// configure middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up all the main routes
app.use(routes);

app.get("/", (_req, res) => {
  res.sendFile("index.html");
});

// test route to see if the application is working properly
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

// catch all in case of an invalid route
app.get("*", (_req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// connect to MongoDB
mongoose.connect(MONGODB_URI);
mongoose.set("debug", true);

// fire up the API
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
