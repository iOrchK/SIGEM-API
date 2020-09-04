var express = require('express');
var router = express.Router();

// Controllers
var search = require("../controllers/movements/search");
var create = require("../controllers/movements/create");
var update = require("../controllers/movements/update");
var remove = require("../controllers/movements/remove");

/* SELECT movements listing. */
router.get('/', async (req, res, next) => {
    let response = await search(req);
    res.status(response.status).send(response);
});

/* CREATE movements. */
router.post('/', async (req, res, next) => {
    let response = await create(req);
    res.status(response.status).send(response);
});

/* UPDATE movements. */
router.put('/', async (req, res, next) => {
    let response = await update(req);
    res.status(response.status).send(response);
});

/* DELETE movements. */
router.delete('/', async (req, res, next) => {
    let response = await remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
