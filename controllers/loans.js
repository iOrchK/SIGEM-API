var CreateResponse = require("../services/response");
var Status = require("../config/utils/status.json");
var Mysql = require("mysql");
var uuid = require("uuid");
require("../config/conection");

module.exports.Search = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;
  var tableLoans = `${database}.datos_generales`;
  var tableCustomers = `${database}.clientes`;

  let where = "";
  if (req.query.id) {
    where = `WHERE l.id = ${req.query.id}`;
  }

  let orderBy = "ORDER BY fecha DESC";

  let titAndCot =
    "IF(c.nom_cot = '' OR c.nom_cot = 'No proporcionado', c.nom_tit, CONCAT(c.nom_tit, ' / ', c.nom_cot))";

  //   let query = `SELECT * FROM ${database}.${table} ${where} ${orderBy}`;
  let query = `
    SELECT l.*, CONCAT(${titAndCot}, ' #', c.num_cte) AS 'cliente_and_num', c.num_cte, ${titAndCot} as cliente, c.tel_tit, c.dom_tit
    FROM ${tableLoans} l
    INNER JOIN ${tableCustomers} c ON l.idCliente = c.id_cliente
    ${where} ${orderBy}`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query}`);
    connection.query(query, (error, rows, fields) => {
      connection.end();
      console.log("Conexión cerrada");

      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      if (!rows || rows === null || rows === undefined || !rows.length) {
        resolve(CreateResponse(Status._400, null));
      }

      resolve(CreateResponse(Status._200, rows));
    });
  });
};

module.exports.Create = async (params) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  params = params.body; // temp
  // Object.assign(params, {codigo: uuid.v4()});
  var query = `INSERT INTO ${database}.datos_generales SET ?`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query} ${JSON.stringify(params)}`);
    connection.query(query, params, (error, results, fields) => {
      connection.end();
      console.log("Conexión cerrada");

      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

      resolve(CreateResponse(Status._201, results));
    });
  });
};

module.exports.Update = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  var post = req.body;
  var query = `UPDATE ${database}.datos_generales SET ? WHERE id = ${post.id}`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query} ${JSON.stringify(post)}`);
    connection.query(query, post, async (error, results, fields) => {
      connection.end();
      console.log("Conexión cerrada");

      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      if (!results.affectedRows && !results.changedRows) {
        resolve(CreateResponse(Status._400, null));
      }
      console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

      resolve(CreateResponse(Status._202, results));
    });
  });
};

module.exports.Remove = async (req) => {
  var connection = Mysql.createConnection(global.gConfig.database);
  var database = global.gConfig.database.name;

  var query = `DELETE FROM ${database}.datos_generales WHERE id = ${req.query.id}`;

  return await new Promise((resolve) => {
    connection.connect();
    console.log("\nConexión establecida");

    console.log(`Ejecutando consulta: ${query}`);
    connection.query(query, (error, results, fields) => {
      connection.end();
      console.log("Conexión cerrada");

      if (error) {
        resolve(CreateResponse(Status._500, error));
      }

      if (!results.affectedRows && !results.changedRows) {
        resolve(CreateResponse(Status._400, null));
      }
      console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

      resolve(CreateResponse(Status._203, results));
    });
  });
};
