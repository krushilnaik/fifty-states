const router = require("express").Router();
const {
  getAllStates,
  getStateByStateCode,
  addStateFunFacts,
  deleteStateFunFactByIndex,
  patchStateFunFactByIndex,
  getStateRandomFunFact,
  getFieldByStateCode,
} = require("../controllers/state.controller");

router.route("/").get(getAllStates);

router.route("/:state").get(getStateByStateCode);

router
  .route("/:state/funfact")
  .get(getStateRandomFunFact)
  .post(addStateFunFacts)
  .patch(patchStateFunFactByIndex)
  .delete(deleteStateFunFactByIndex);

router.route("/:state/:field").get(getFieldByStateCode);

module.exports = router;
