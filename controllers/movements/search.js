var CreateResponse = require("../../services/response");
var Status = require("../../config/utils/status.json");
var Mysql = require("mysql");
require('../../config/conection');

module.exports = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    let where = "";
    if (req.query.id) {
        where = `WHERE id = ${req.query.id}`;
    }

    let query = `SELECT * FROM ${database}.refrendos ${where}`;
    
    return await new Promise((resolve) => {
        connection.connect();
        console.log("\nConexión establecida");

        console.log(`Ejecutando consulta: ${query}`);
        connection.query(query, (error, rows, fields) => {
            resolve(
                CreateResponse(
                    error ? Status._500 : Status._200,
                    error ? error : rows
                )
            );
        });

        connection.end();
        console.log("Conexión cerrada");
    });
}
