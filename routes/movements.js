var express = require("express");
var router = express.Router();

// Controllers
var Movements = require("../controllers/movements");

/* SELECT movements listing. */
router.get("/", async (req, res, next) => {
  let response = await Movements.Search(req);
  res.status(response.status).send(response);
});

/* CREATE movements. */
router.post("/", async (req, res, next) => {
  let response = await Movements.Create(req);
  res.status(response.status).send(response);
});

/* UPDATE movements. */
router.put("/", async (req, res, next) => {
  let response = await Movements.Update(req);
  res.status(response.status).send(response);
});

/* DELETE movements. */
router.delete("/", async (req, res, next) => {
  let response = await Movements.Remove(req);
  res.status(response.status).send(response);
});

module.exports = router;
