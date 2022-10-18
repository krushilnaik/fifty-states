const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes");
const path = require("path");

const app = express();

// get the environment variables
const {
  parsed: { MONGODB_URI = "mongodb://localhost/states", PORT = 8080 },
} = require("dotenv").config();

// configure templating engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

// configure middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up API documentation generator

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for FiftyStates",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

// API documentation is available at /docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: "/css/swagger.css",
  })
);

// set up all the main routes
app.use(routes);

// connect to MongoDB
mongoose.connect(MONGODB_URI);
mongoose.set("debug", true);

// fire up the API
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
