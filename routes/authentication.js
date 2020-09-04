var express = require('express');
var router = express.Router();

// Controllers
var Authentication = require("../controllers/authentication");

/* Login. */
router.post('/login', async (req, res, next) => {
    let response = await Authentication.Login(req);
    res.status(response.status).send(response);
});

/* CREATE authentication. */
router.post('/token/verify', async (req, res, next) => {
    let response = await Authentication.TokenVerify(req);
    res.status(response.status).send(response);
});

/* Update Token. */
router.put('/token/update', async (req, res, next) => {
    let response = await Authentication.TokenUpdate(req);
    res.status(response.status).send(response);
});

module.exports = router;
