var CreateResponse = require("../../services/response");
var Status = require("../../config/utils/status.json");
var Mysql = require("mysql");
require('../../config/conection');

module.exports = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    var query = `DELETE FROM ${database}.refrendos WHERE id = ${req.query.id}`;
    
    return await new Promise((resolve) => {
        connection.connect();
        console.log("\nConexión establecida");
    
        console.log(`Ejecutando consulta: ${query}`);
        connection.query(query, (error, results, fields) => {
            resolve(
                CreateResponse(
                    error ? Status._503 : Status._203,
                    error ? error : results
                )
            );
        });
        
        connection.end();
        console.log("Conexión cerrada");
    });
}
