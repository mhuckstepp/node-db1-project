const Accounts = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  const { budget, name } = req.body;
  if (!name || !budget) {
    res.status(404).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    res.status(404).json({ message: "name of account must be a string" });
  } else if (name.trim().length > 100 || name.trim().length < 3) {
    res
      .status(404)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    res.status(404).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(404)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const tryName = req.body.name;
  const counter = await db("accounts").count("name").where({ name: tryName });
  const checker = counter[0]["count(`name`)"];
  if (!checker) {
    next();
  } else {
    res.status(404).json({ message: "that name is taken" });
  }
};

exports.checkAccountId = async (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (account && typeof account === "object") {
        req.account = account;
        next();
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
