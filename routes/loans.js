var express = require('express');
var router = express.Router();

// Controllers
var search = require("../controllers/loans/search");
var create = require("../controllers/loans/create");
var update = require("../controllers/loans/update");
var remove = require("../controllers/loans/remove");

/* SELECT loans listing. */
router.get('/', async (req, res, next) => {
    let response = await search(req);
    res.status(response.status).send(response);
});

/* CREATE loans. */
router.post('/', async (req, res, next) => {
    let response = await create(req);
    res.status(response.status).send(response);
});

/* UPDATE loans. */
router.put('/', async (req, res, next) => {
    let response = await update(req);
    res.status(response.status).send(response);
});

/* DELETE loans. */
router.delete('/', async (req, res, next) => {
    let response = await remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
