/**
 * Declarar librerías node
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/**
 * Inicializar aplicación express
 */
var app = express();

/**
 * Configurar path para el motor de vistas pug
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/authentication', require('./routes/authentication'));
app.use('/clasifications', require('./routes/clasifications'));
app.use('/customers', require('./routes/customers'));
app.use('/identifications', require('./routes/identifications'));
app.use('/loans', require('./routes/loans'));
app.use('/movements', require('./routes/movements'));
app.use('/users', require('./routes/users'));
app.use('/generic', require('./routes/generic/generic'));

/**
 * Captar error 404 y reenviar al manejador de errores
 */
app.use(function(req, res, next) {
  console.log("Manejador de errores");
  next(createError(404));
});

/**
 * Manejador de errores
 */
app.use(function(err, req, res, next) {
  // Variables para el view de error, solo se muestra el error en ambiente de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar view de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
