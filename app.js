var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.get('/credentials', function (req, res) {
  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };
  res.json({ credentials });
});

// Define a route for the redirect with a wildcard parameter
app.get('/:filename', function (req, res, next) {
  var filename = req.params.filename;
  res.redirect(`https://dreamscriptstorage.sfo2.cdn.digitaloceanspaces.com/${filename}.zip`);
  // var lastXIndex = filename.lastIndexOf('x');
  // var versionNumber = 0;
  // if (lastXIndex !== -1) {
  //   var binaryString = filename.substring(lastXIndex + 1); // Extract the binary string from the URL
  //   versionNumber = binaryString.replace(/i/g, '1').replace(/o/g, '0'); // Convert 'I' to '1' and 'O' to '0'
  //   versionNumber = parseInt(versionNumber, 2);
  //   filename = filename.substring(0, lastXIndex - 1);
  //   if (!versionNumber) return res.status(400).send('Invalid dream file URL');
  // }
  // if (versionNumber)
  //   // Redirect to the desired URL
  //   res.json({
  //     binaryString,
  //     versionNumber,
  //     constructedURL: `https://dreamscripts.blob.core.windows.net/mustafah/${filename}${versionNumber !== 0 ? '[' + versionNumber + ']' : ''}.zip`
  //   });
  // res.redirect(`https://dreamscripts.blob.core.windows.net/mustafah/${filename}[${parseInt(versionNumber, 2)}].zip`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;