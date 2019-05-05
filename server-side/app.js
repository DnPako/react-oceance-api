const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require("passport");
const jwtStrategy = require("./config/passport");
const db = require('./db');
// ROUTES
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

// DB Connection
db.connect();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Allow Cross Origin
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

// Passport JWT strategy
passport.use(jwtStrategy);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/product', passport.authenticate('jwt', { session: false }), productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// TODO: send json error object
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    const error = {
        message: err.message,
        status: err.status || 500
    };
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(error.status);
    res.json({error});
});

module.exports = app;
