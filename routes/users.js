var express = require('express');
var router = express.Router();
var SchemaValidator = require("../services/schemaValidator");
var Schema = require("../config/schemas/request");

// Controllers
var Users = require("../controllers/users");

/* SELECT users listing. */
router.get('/', async (req, res, next) => {
    let promise = await Users.Search(req);
    res.status(promise.status).send(promise);
});

/* CREATE users. */
router.post('/', async (req, res, next) => {
    let body = await SchemaValidator.Validate(req.body, Schema.BODY.USERS.CREATE);
    if ("status" in body) {
        res.status(body.status).send(body);
    } else {
        let promise = await Users.Create(body);
        res.status(promise.status).send(promise);
    }
});

/* UPDATE users. */
router.put('/', async (req, res, next) => {
    let body = await SchemaValidator.Validate(req.body, Schema.BODY.USERS.UPDATE);
    if ("status" in body) {
        res.status(body.status).send(body);
    } else {
        let promise = await Users.Update(body);
        res.status(promise.status).send(promise);
    }
});

/* DELETE users. */
router.delete('/', async (req, res, next) => {
    let promise = await Users.Remove(req);
    res.status(promise.status).send(promise);
});

module.exports = router;
