const router = require("express").Router();
const State = require("../models/State");

router.route("/").get((req, res) => {
  const { contig } = req.query;

  let filters;

  if (contig === undefined) {
    filters = {};
  } else {
    if (contig === "true") {
      filters = { stateCode: { $nin: ["AK", "HI"] } };
    } else {
      filters = { stateCode: { $in: ["AK", "HI"] } };
    }
  }

  State.find(filters)
    .select(["-_id", "-__v"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.route("/:state").get((req, res) => {
  const { state } = req.params;

  State.findOne({ stateCode: state })
    .select(["-_id", "-__v"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.route("/:state/admission").get((req, res) => {
  const { state } = req.params;

  State.findOne({ stateCode: state })
    .select(["state", "admitted", "-_id"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.route("/:state/:field").get((req, res) => {
  const { state, field } = req.params;

  State.findOne({ stateCode: state })
    .select(["state", field, "-_id"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
