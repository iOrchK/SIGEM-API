var express = require('express');
var router = express.Router();

// Controllers
var Clasifications = require("../controllers/clasifications");

/* SELECT clasifications listing. */
router.get('/', async (req, res, next) => {
    let response = await Clasifications.Search(req);
    res.status(response.status).send(response);
});

/* CREATE clasifications. */
router.post('/', async (req, res, next) => {
    let response = await Clasifications.Create(req);
    res.status(response.status).send(response);
});

/* UPDATE clasifications. */
router.put('/', async (req, res, next) => {
    let response = await Clasifications.Update(req);
    res.status(response.status).send(response);
});

/* DELETE clasifications. */
router.delete('/', async (req, res, next) => {
    let response = await Clasifications.Remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
