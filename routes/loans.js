var express = require("express");
var router = express.Router();

// Controllers
var Loans = require("../controllers/loans");

/* SELECT loans listing. */
router.get("/", async (req, res, next) => {
  let response = await Loans.Search(req);
  res.status(response.status).send(response);
});

/* CREATE loans. */
router.post("/", async (req, res, next) => {
  let response = await Loans.Create(req);
  res.status(response.status).send(response);
});

/* UPDATE loans. */
router.put("/", async (req, res, next) => {
  let response = await Loans.Update(req);
  res.status(response.status).send(response);
});

/* DELETE loans. */
router.delete("/", async (req, res, next) => {
  let response = await Loans.Remove(req);
  res.status(response.status).send(response);
});

module.exports = router;
