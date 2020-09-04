var CreateResponse = require("../services/response");
var Status = require("../config/utils/status.json");
var Mysql = require("mysql");
var Tokenizador = require("../services/tokenizador");
require('../config/conection');

module.exports.Login = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;
    var {correo, clave_acceso} = req.body;
    
    if (!correo || !clave_acceso) {
        return CreateResponse(Status._100, req.query);
    }

    var query = `SELECT id_usuario, codigo, nombre, correo, clave_acceso, rol, activo FROM ${database}.usuarios WHERE correo = '${correo}' AND clave_acceso = '${clave_acceso}' AND activo = 1`;
    
    return await new Promise((resolve) => {
        connection.connect();
        console.log("\nConexión establecida");

        console.log(`Ejecutando consulta: ${query}`);
        connection.query(query, async (error, rows, fields) => {
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
            
            var usuario = rows[0];
            console.log(`Resultado de la consulta: ${JSON.stringify(usuario)}`);

            usuario = await Tokenizador.GenerarToken(usuario);
            resolve(
                CreateResponse(Status._200, usuario)
            );
        });
    });
}


module.exports.TokenVerify = async (req) => {
    let {id_usuario, token} = req.body;
    if (!id_usuario && !token) {
        return CreateResponse(Status._100, req.body);
    }

    let tokenObj = await Tokenizador.ValidarToken(token, id_usuario);

    if (!tokenObj) {
        var connection = Mysql.createConnection(global.gConfig.database);
        var database = global.gConfig.database.name;

        var query = `UPDATE ${database}.usuarios SET ? WHERE id_usuario = ${id_usuario}`;
        var params = {token: null};
        
        return await new Promise((resolve) => {
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

                if (!results.affectedRows && !results.changedRows) {
                    resolve(
                        CreateResponse(Status._400, null)
                    );
                }
                console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

                resolve(
                    CreateResponse(Status._401, token)
                );
            });
        });
    }
    
    return CreateResponse(Status._200, tokenObj);
}


module.exports.TokenUpdate = async (req) => {
    var connection = Mysql.createConnection(global.gConfig.database);
    var database = global.gConfig.database.name;

    var {id_usuario, token} = req.body;
    if (!id_usuario && !token) {
        return CreateResponse(Status._100, req.body)
    }
    
    var query = `UPDATE ${database}.usuarios SET ? WHERE id_usuario = ${id_usuario}`;
    var params = {token: token};
    
    return await new Promise((resolve) => {
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

            if (!results.affectedRows && !results.changedRows) {
                resolve(
                    CreateResponse(Status._400, null)
                );
            }
            console.log(`Resultado de la consulta: ${JSON.stringify(results)}`);

            resolve(
                CreateResponse(Status._200, results)
            );
        });
    });
}
