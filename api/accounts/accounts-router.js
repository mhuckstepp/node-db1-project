const router = require("express").Router();
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  Accounts.create(req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
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
