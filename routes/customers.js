var express = require('express');
var router = express.Router();

// Controllers
var search = require("../controllers/customers/search");
var create = require("../controllers/customers/create");
var update = require("../controllers/customers/update");
var remove = require("../controllers/customers/remove");

/* SELECT customers listing. */
router.get('/', async (req, res, next) => {
    let response = await search(req);
    res.status(response.status).send(response);
});

/* CREATE customers. */
router.post('/', async (req, res, next) => {
    let response = await create(req);
    res.status(response.status).send(response);
});

/* UPDATE customers. */
router.put('/', async (req, res, next) => {
    let response = await update(req);
    res.status(response.status).send(response);
});

/* DELETE customers. */
router.delete('/', async (req, res, next) => {
    let response = await remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
