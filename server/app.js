const express = require('express'),
	path = require('path'),
	request = require('request'),
    router = express.Router();

var app = express();

// view engine setup

app.use('/static', express.static(path.join(__dirname, '../client/static')))

app.set('views', path.join(__dirname, '../client/'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(router);

/*************************  ROUTING FUNCTIONALITIES *****************************/
app.get('/*', (req, res, next) => {
	res.render('index')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = app;
