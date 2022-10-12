const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("../routes");

const app = express();

// get the environment variables
const {
  parsed: { MONGODB_URI = "mongodb://localhost/states", PORT = 8080 },
} = require("dotenv").config();

// configure middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

// set up all the main routes
app.use(routes);

app.get("/", (req, res) => {
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
