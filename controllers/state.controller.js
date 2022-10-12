const State = require("../models/State");

/**
 * @type {import("express").RequestHandler}
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
function getStateField(req, res) {
  let { state, field } = req.params;

  /**
   * There was a discrepancy in the assignment rubric.
   * In some places it used "admitted", and others "admission".
   * This just accounts for that.
   */
  if (field === "admission") field = "admitted";

  State.findOne({ stateCode: state })
    .select(["state", field, "-_id"])
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

/**
 * @type {import("express").RequestHandler}
 */
function addStateFunFacts(req, res) {
  //
}

/**
 * @type {import("express").RequestHandler}
 */
function deleteStateFunFactByIndex(req, res) {
  const { index } = req.body;

  res.status(200).send({ message: `${req.params.state} fun facts successfully updated` });
}

module.exports = {
  getAllStates,
  getStateByStateCode,
  getStateField,
  deleteStateFunFactByIndex,
  addStateFunFacts,
};
