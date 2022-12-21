
require('./models/model');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session= require('express-session');
const flash=require('connect-flash');
const mongoStore = require('connect-mongo');
const connectToDb = require('./dbConnect');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();
const PORT = process.env.PORT || 7000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'teambadgerw2',
  saveUninitialized: false,
  resave: false,
  store: mongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017',
    touchAfter: 24 * 3600
  })

}));
app.use('/', indexRouter);
app.use('/', authRouter);

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

connectToDb()

app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
})
module.exports = app;
