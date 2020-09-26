var CreateResponse = require("../services/response");
var Status = require("../config/utils/status.json");
var Mysql = require("mysql");
require("../config/conection");

module.exports.Search = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  let where = "";
  if (req.query.id) {
    where = `WHERE m.id = ${req.query.id}`;
  }
  if (req.query.idDatosGenerales) {
    where = `WHERE m.idDatosGenerales = ${req.query.idDatosGenerales}`;
  }
  var tableMovs = `${database}.refrendos`;
  var tableLoans = `${database}.datos_generales`;

  let orderBy = "ORDER BY fechaVencimiento ASC";

  let query = `
      SELECT m.*, l.capital as capitalInicial, l.tasa
      FROM ${tableMovs} m
      INNER JOIN ${tableLoans} l ON m.idDatosGenerales = l.id
      ${where}
      ${orderBy}`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query}`);
    connection.query(query, (error, rows, fields) => {
      resolve(
        CreateResponse(error ? Status._500 : Status._200, error ? error : rows)
      );
    });

    connection.end();
    console.log("Conexión cerrada");
  });
};

module.exports.Create = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  var post = req.body;
  var query = `INSERT INTO ${database}.refrendos SET ?`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query} ${post}`);
    connection.query(query, post, (error, results, fields) => {
      resolve(
        CreateResponse(
          error ? Status._501 : Status._201,
          error ? error : results
        )
      );
    });

    connection.end();
    console.log("Conexión cerrada");
  });
};

module.exports.Update = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  var post = req.body;
  var query = `UPDATE ${database}.refrendos SET ? WHERE id = ${post.id}`;

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
};

module.exports.Remove = async (req) => {
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
};
