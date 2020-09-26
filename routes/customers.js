var express = require('express');
var router = express.Router();

// Controllers
var Customers = require("../controllers/customers");

/* SELECT customers listing. */
router.get('/', async (req, res, next) => {
    let response = await Customers.Search(req);
    res.status(response.status).send(response);
});

/* CREATE customers. */
router.post('/', async (req, res, next) => {
    let response = await Customers.Create(req);
    res.status(response.status).send(response);
});

/* UPDATE customers. */
router.put('/', async (req, res, next) => {
    let response = await Customers.Update(req);
    res.status(response.status).send(response);
});

/* DELETE customers. */
router.delete('/', async (req, res, next) => {
    let response = await Customers.Remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
