var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var logger = require('morgan');
var stylus = require('stylus');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/ivandb';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var Member = require('./models/member');

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var videosRouter = require('./routes/videos');

var app = express();

//Set up mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up Passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        Member.findOne({username: username}, function(err, user){
            if(err) { return done(err);}
            if(!user) { 
                return done(null, false, {messages: 'Incorrect Username or Password'});
            }
            user.validPassword(password).then((result) => {
                if(result && result!=undefined){
                    return done(null, user);
                } else {
                    return done(null, false, {messages: 'Incorrect Username or Password'});
                }
            })
        });
    }
));

//Setup Passport seesion
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Member.findById(id, function(err, user) {
    done(err, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "bobthebuilder", resave: false, saveUninitialized: false}));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/videos', videosRouter);
app.use('/member', membersRouter);

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
