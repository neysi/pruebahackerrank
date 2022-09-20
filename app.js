const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./connection')
const indexRouter = require('./routes/index');
const tradesRouter = require('./routes/trades');

const app = express();

const allowedMethods = ['GET', 'HEAD', 'POST']


// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) return res.status(405).end('Method not allowed')
    return next()
})

app.use('/trades', tradesRouter);
app.use('/', indexRouter);

module.exports = app;
