const router = require("express").Router();

const stateRoutes = require("./states.routes");

router.use("/states", stateRoutes);

module.exports = router;
