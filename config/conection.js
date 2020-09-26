var lodash = require('lodash');
var Mysql = require("mysql");

var conection = require('./schemas/conection.json');
var environment = conection[process.env.NODE_ENV || 'development'];
var defaul = conection.development;

global.gConfig = lodash.merge(defaul, environment);
console.log('Ambiente configurado: ' + environment.name);
