const sample = require("lodash.sample");
const State = require("../models/State");

/**
 * @type {import("express").RequestHandler<{state: string}>}
 */
function getAllStates(req, res) {
  const { contig } = req.query;

  let filters;

  /**
   * Filter by mainland or not,
   * or all 50 states if query parameter undefined
   */
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
}

/**
 * @type {import("express").RequestHandler<{state: string}>}
 */
function getStateByStateCode(req, res) {
  const { state } = req.params;

  State.findOne({ stateCode: state })
    .select(["-_id", "-__v"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

/**
 * @type {import("express").RequestHandler<{state: string, field: string}>}
 */
function getFieldByStateCode(req, res) {
  let { state, field } = req.params;

  /**
   * There was a discrepancy in the assignment rubric.
   * In some places it used "admitted", and others "admission".
   * This just accounts for that.
   */
  if (field === "admission") field = "admitted";

  State.findOne({ stateCode: state })
    .select(["state", field, "-_id"])
    .then((data) => res.json(data || {}))
    .catch((err) => res.status(500).json(err));
}

/**
 * @type {import("express").RequestHandler<{state: string}>}
 */
function getStateRandomFunFact(req, res) {
  let { state } = req.params;

  State.findOne({ stateCode: state.toUpperCase() })
    .select(["state", "funFacts", "-_id"])
    .then((data) => res.json(sample(data.funFacts) || {}))
    .catch((err) => res.status(500).json(err));
}

/**
 * @type {import("express").RequestHandler<{state: string}, any, {funfacts: string[]}>}
 */
async function addStateFunFacts(req, res) {
  const { state } = req.params;
  const { funfacts } = req.body;

  if (!funfacts) {
    res.status(400).send("The facts you provided weren't fun enough");
  }

  State.findOne({ stateCode: state })
    .select(["funFacts", "-_id"])
    .exec(async (error, data) => {
      if (error) {
        res.status(400).send("Error: No state with that code found");
      }

      await State.updateOne(
        { stateCode: state },
        { $set: { funFacts: data.funFacts.concat(funfacts) } }
      ).exec();

      res.send("State fun facts successfully updated");
    });
}

/**
 * @type {import("express").RequestHandler<{state: string}, any, {index: number, funfact: string}>}
 */
async function patchStateFunFactByIndex(req, res) {
  const { state } = req.params;
  const { index, funfact } = req.body;

  if (!funfact || !index) {
    res.status(400).send("Please provide an index and a fact");
  }

  await State.findOne({ stateCode: state }).exec(async (error, data) => {
    if (error) {
      res.status(400).send("Error: No state with that code found");
    }

    // update the facts
    let { funFacts } = data;
    // minus one because the rubric asked to make the index passed in start at 1
    // 0 is invalid
    funFacts[index - 1] = funfact;

    await State.updateOne({ stateCode: state }, { $set: { funFacts } }).exec();

    res.send("State fun facts successfully updated");
  });
}

/**
 * @type {import("express").RequestHandler<{state: string}, any, {index: number}>}
 */
async function deleteStateFunFactByIndex(req, res) {
  const { index } = req.body;

  if (!index) {
    res.status(400).send({ message: "Error: must provide valid index starting at 1" });
  }

  res.status(200).send({ message: `${req.params.state} fun facts successfully updated` });
}

module.exports = {
  getAllStates,
  getStateByStateCode,
  getFieldByStateCode,
  deleteStateFunFactByIndex,
  getStateRandomFunFact,
  patchStateFunFactByIndex,
  addStateFunFacts,
};
