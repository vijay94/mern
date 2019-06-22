const createError = require('http-errors'),
	express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan');

// require('dotenv').config({path : path.join(__dirname, '.env')});
// require('dotenv').config({path : path.join(__dirname, '.env.url-only')});

var app = express();

var distDir = '../dist';

app.use(logger(':date[iso] ":method :url HTTP/:http-version" :status :response-time ms ":referrer" ":user-agent"'));
app.use(cookieParser());


app.set('views', path.join(__dirname, distDir));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(/[\/]/,(req, res) => {
	res.render("index");
});

app.use(express.static(path.join(__dirname, distDir)))

app.use(/^((?!(api)).)*/, (req, res) => {
	res.render("index");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.status(500).send({ status : 500, message : "Internal Server Error" });
});

module.exports = app;
