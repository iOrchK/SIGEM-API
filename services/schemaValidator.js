var Ajv = require('ajv');
var CreateResponse = require("../services/response");
var Status = require("../config/utils/status.json");

exports.Validate = async function (body, schema) {
    // let detalles = [];
    let ajv = new Ajv();
    let valido = ajv.validate(schema, body);

    if (!valido) {
        console.log("Schema Error: ", ajv.errors);
        return CreateResponse(Status._405, ajv.errors);
    }
    return body
}