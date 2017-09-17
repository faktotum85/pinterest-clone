const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config({ path: '.env' });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pinterestClone', {
  useMongoClient: true
});
mongoose.connection.on('error', (err) => {
  console.error(`database connection error -> ${err.message}`);
});

// importing all models
require('./models/User');
require('./models/Pin');

require('./config/passport')(passport); // pass passport for configuration

app.use(session({ // set up sessions
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize()); // link passport with sessions
app.use(passport.session());

app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

const index = require('./routes/index');
const user = require('./routes/user');

app.use('/', index);
app.use('/', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
