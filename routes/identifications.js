var express = require('express');
var router = express.Router();

// Controllers
var Identifications = require("../controllers/identifications");

/* SELECT identifications listing. */
router.get('/', async (req, res, next) => {
    let response = await Identifications.Search(req);
    res.status(response.status).send(response);
    return;
});

/* CREATE identifications. */
router.post('/', async (req, res, next) => {
    let response = await Identifications.Create(req);
    res.status(response.status).send(response);
});

/* UPDATE identifications. */
router.put('/', async (req, res, next) => {
    let response = await Identifications.Update(req);
    res.status(response.status).send(response);
});

/* DELETE identifications. */
router.delete('/', async (req, res, next) => {
    let response = await Identifications.Remove(req);
    res.status(response.status).send(response);
});

module.exports = router;
