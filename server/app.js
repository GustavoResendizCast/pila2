var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('dwpc2:server');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

import debug from './services/debugLogger';
// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing webpack configuration
import webpackConfig from '../webpack.dev.config'

// Se crea la instancia de express
var app = express();
// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production'

// Deciding if we add webpack or not
if(nodeEnviroment = 'developmnet'){
  // Start Webpack dev server
  debug("🛠️ Ejecutando en modo desarrollo 🛠️");
  // Adding the key "mode" with its value as the express server
  webpackConfig.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
  // Agregar el plugin a la configuracion de desarrllo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enable the webpack middleware
  app.use( WebpackDevMiddleware(bundle,{
    publicPath: webpackConfig.output.publicPath
  }) );
  // Enabling the webpack HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log(" 🏭 Ejecutando en modo producción🏭")
}

// Configurando el motor de plantilla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Se establecen los middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Se crea un server de archivos estaticos 
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
// Activa "userRouter" cuando se 
// solicita "/user"
app.use('/users', usersRouter);
// app.use('/author', (req, res) => {
//   res.json({mainDeveloper: "Vianney Reyes"})
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
