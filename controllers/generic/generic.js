var CreateResponse = require("../../services/response");
var Status = require("../../config/utils/status.json");
var Mysql = require("mysql");
require("../../config/conection");

module.exports.Import = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  var post = req.body;
  var queryDelete = `TRUNCATE TABLE ${database}.${post.table}`;

  return await new Promise((resolve, reject) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Limpiando tabla ${post.table}: ${queryDelete}`);
    connection.query(queryDelete, async (error, results, fields) => {
      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);
    });

    var query = `INSERT INTO ${database}.${post.table} (${post.keys}) VALUES ?`;

    console.log(`Importando datos: ${query} ${JSON.stringify(post.values)}`);
    connection.query(query, [post.values], async (error, results, fields) => {
      connection.end();
      console.log("Conexión cerrada");

      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      if (!results) {
        resolve(
          CreateResponse(
            Status._500,
            "A ocurrido un error. Favor de contactar al administrador del sistema."
          )
        );
      }

      console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);
      resolve(CreateResponse(Status._201, null));
    });
  });
};
