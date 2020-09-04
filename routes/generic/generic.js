var express = require('express');
var router = express.Router();

// Controllers
var Generic = require("../../controllers/generic/generic");

/* Import. */
router.post('/import', async (req, res, next) => {
    let response = await Generic.Import(req);
    res.status(response.status).send(response);
});

module.exports = router;
