var CreateResponse = require("../services/response");
var Status = require("../config/utils/status.json");
var Mysql = require("mysql");
var uuid = require("uuid");
require('../config/conection');

module.exports.Search = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    let where = "";
    if (req.query.id) {
        where = `WHERE id = ${req.query.id}`;
    }

    let query = `SELECT * FROM ${database}.identificaciones ${where}`;
    
    return await new Promise((resolve, reject) => {
        connection.connect();
        console.log("\nConexión establecida");

        console.log(`Ejecutando consulta: ${query}`);
        connection.query(query, (error, rows, fields) => {
            connection.end();
            console.log("Conexión cerrada");

            if (error) {
                resolve(
                    CreateResponse(Status._500, error)
                );
            }

            if (!rows || rows === null || rows === undefined || !rows.length) {
                resolve(
                    CreateResponse(Status._400, null)
                );
            }

            resolve(
                CreateResponse(Status._200, rows)
            );
        });
    });
}


module.exports.Create = async (params) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    Object.assign(params, {codigo: uuid.v4()});
    var query = `INSERT INTO ${database}.identificaciones SET ?`;
    
    return await new Promise((resolve, reject) => {
        connection.connect();
        console.log("\nConexión establecida");

        console.log(`Ejecutando consulta: ${query} ${params}`);
        connection.query(query, params, (error, results, fields) => {
            connection.end();
            console.log("Conexión cerrada");

            if (error) {
                resolve(
                    CreateResponse(Status._500, error)
                );
            }

            console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

            resolve(
                CreateResponse(Status._201, results)
            );
        });
    });
}


module.exports.Update = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    var post  = req.body;
    var query = `UPDATE ${database}.identificaciones SET ? WHERE id = ${post.id}`;
    
    return await new Promise((resolve, reject) => {
        connection.connect();
        console.log("\nConexión establecida");

        console.log(`Ejecutando consulta: ${query} ${JSON.stringify(req)}`);
        connection.query(query, req, async (error, results, fields) => {
            connection.end();
            console.log("Conexión cerrada");

            if (error) {
                resolve(
                    CreateResponse(Status._500, error)
                );
            }

            if (!results.affectedRows && !results.changedRows) {
                resolve(
                    CreateResponse(Status._400, null)
                );
            }
            console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

            resolve(
                CreateResponse(Status._202, results)
            );
        });
    });
}


module.exports.Remove = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    var query = `DELETE FROM ${database}.identificaciones WHERE id = ${req.query.id}`;
    
    return await new Promise((resolve, reject) => {
        connection.connect();
        console.log("\nConexión establecida");
    
        console.log(`Ejecutando consulta: ${query}`);
        connection.query(query, (error, results, fields) => {
            connection.end();
            console.log("Conexión cerrada");

            if (error) {
                resolve(
                    CreateResponse(Status._500, error)
                );
            }

            if (!results.affectedRows && !results.changedRows) {
                resolve(
                    CreateResponse(Status._400, null)
                );
            }
            console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

            resolve(
                CreateResponse(Status._203, results)
            );
        });
    });
}
