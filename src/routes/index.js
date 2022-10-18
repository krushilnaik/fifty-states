const router = require("express").Router();

const State = require("../models/State");
const stateRoutes = require("./states.routes");

router.get("/", (_req, res) => {
  State.find({})
    .select(["state", "stateCode", "-_id"])
    .then((data) => {
      // build the home page then return it in the response
      res.render("home", {
        states: data.map(({ state, stateCode }) => `${state} (${stateCode})`),
      });
    })
    .catch((error) => res.status(500).send(error));
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: test route to see if the application is working properly
 *     description: test route to see if the application is working properly
 */
router.get("/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

// makes prepends "/states" to all routes defined in `stateRoutes`
router.use("/states", stateRoutes);

// catch all in case of an invalid route
router.get("*", (_req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

module.exports = router;
