const router = require("express").Router();
const {
  getAllStates,
  getStateByStateCode,
  getStateField,
  addStateFunFacts,
  deleteStateFunFactByIndex,
} = require("../controllers/state.controller");

// const State = require("../models/State");

router.route("/").get(getAllStates);

router.route("/:state").get(getStateByStateCode);

// router.route("/:state/admission").get((req, res) => {
//   const { state } = req.params;

//   State.findOne({ stateCode: state })
//     .select(["state", "admitted", "-_id"])
//     .then((data) => res.json(data))
//     .catch((err) => res.status(500).json(err));
// });

router
  .route("/:state/funfact")
  .get(getStateField)
  .post(addStateFunFacts)
  .delete(deleteStateFunFactByIndex);

router.route("/:state/:field").get(getStateField);

module.exports = router;
