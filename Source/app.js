var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var tournamentRouter = require('./routes/tournaments');
var teamRouter = require('./routes/teams');
var playerRouter = require('./routes/player');
var matchesRouter = require('./routes/matches');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret : "secret",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  const uid = req.cookies.uid;
  const username = req.cookies.username;
  if (uid || username) {
    req.session.uid = uid;
    req.session.username = username;
    req.session.loggedIn = true;
    res.locals.loggedIn = true;
    res.locals.roleName = req.session.roleName;
    console.log("LoggedIn : true")
  }
  
  next();
});

app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.loggedIn = true;
    res.locals.username = req.session.username;
    res.locals.roleName = req.session.roleName;
  }
  next();
})

app.use(function (req, res, next) {
  res.locals.active = {
    home: false,
    tournaments: false,
    teams: false,
    matches: false,
    players: false,
    login: false,
    signup: false
  };

  const page = req.originalUrl.split(/[\s?/]+/)[1];
  let selected = "";
  if (page == '') {
    selected = "home";
  } else if (page == "auth") {
    selected = req.originalUrl.split(/[\s?/]+/)[2];
  } else {
    selected = page;
  }

  res.locals.active[selected] = true;
  console.log(page);
  console.log(res.locals.active);
  next();
});

function needLogin(req, res, next) {
  const uid = req.cookies.uid;
  const username = req.cookies.username;
  if (!uid || !username) {
    res.redirect("/auth/login");
    return;
  };
  next();
}

app.use('/teams', needLogin, teamRouter);
app.use('/tournaments', needLogin, tournamentRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/matches', needLogin, matchesRouter);
app.use('/players', needLogin, playerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  next(createError(403));
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
