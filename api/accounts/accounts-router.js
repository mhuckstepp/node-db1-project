const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  Accounts.getAll(req.query)
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line
router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
