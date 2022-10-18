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

/**
 * @swagger
 * /states:
 *   get:
 *     summary: get all information on all states
 *     description: Look a state up by the state code and get the information stored in our database. Not all states may be supported. Check the home page for a list of supported states.
 */
router.route("/").get(getAllStates);

/**
 * @swagger
 * /states/{state}:
 *   get:
 *     summary: get a single state's information
 *     description: Look a state up by the state code and get the information stored in our database. Not all states may be supported. Check the home page for a list of supported states.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: State code (KS, MO, etc.)
 *         schema:
 *           type: string
 */
router.route("/:state").get(getStateByStateCode);

/**
 * @swagger
 * /states/{state}/funfact:
 *   get:
 *     summary: get a single state's information
 *     description: Look a state up by the state code and get the information stored in our database. Not all states may be supported. Check the home page for a list of supported states.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: State code (KS, MO, etc.)
 *         schema:
 *           type: string
 *   post:
 *     summary: Append more fun facts
 *     description:
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: State code (KS, MO, etc.)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               funfacts:
 *                 type: string[]
 *                 description: List of fun facts to append to the ones already in the database.
 *                 example: ["fun fact 1", "fun fact 2"]
 *   patch:
 *     summary: Change a fact by index
 *     description:
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: State code (KS, MO, etc.)
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a fun fact
 *     description: Delete a fun fact
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: State code (KS, MO, etc.)
 *         schema:
 *           type: string
 */
router
  .route("/:state/funfact")
  .get(getStateRandomFunFact)
  .post(addStateFunFacts)
  .patch(patchStateFunFactByIndex)
  .delete(deleteStateFunFactByIndex);

/**
 * @swagger
 * /states/{state}/{field}:
 *   get:
 *     summary: get a single property of a single state
 *     description:
 */
router.route("/:state/:field").get(getFieldByStateCode);

module.exports = router;
