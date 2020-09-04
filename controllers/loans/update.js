var CreateResponse = require("../../services/response");
var Status = require("../../config/utils/status.json");
var Mysql = require("mysql");
require('../../config/conection');

module.exports = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    var post  = req.body;
    var query = `UPDATE ${database}.datos_generales SET ? WHERE id = ${post.id}`;
    
    return await new Promise((resolve) => {
        connection.connect();
        console.log("\nConexión establecida");
    
        console.log(`Ejecutando consulta: ${query} ${post}`);
        connection.query(query, post, (error, results, fields) => {
            resolve(
                CreateResponse(
                    error ? Status._502 : Status._202,
                    error ? error : results
                )
            );
        });

        connection.end();
        console.log("Conexión cerrada");
    });
}
