const router = require("express").Router();
const State = require("../models/State");

router.route("/").get((req, res) => {
  const { contig } = req.query;
  //
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
    .select([])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.route("/:state/:field").get((req, res) => {
  //
});

// router.route("/states/:state/funfact").get((req, res) => {
//   //
// });

// router.route("/states/:state/capital").get((req, res) => {
//   //
// });

// router.route("/states/:state/nickname").get((req, res) => {
//   //
// });

// router.route("/states/:state/nickname").get((req, res) => {
//   //
// });

// router.route("/states/:state/population").get((req, res) => {
//   //
// });

module.exports = router;
