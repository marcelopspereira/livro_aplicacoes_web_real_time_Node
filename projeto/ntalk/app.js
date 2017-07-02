var express = require('express'),
  load = require('express-load'),
  //error = require('./middleware/error'),

  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),


  app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(session({
  secret: 'ntalk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(error.notFound);
// app.use(error.serverError);


// get an instance of router
var router = express.Router();
// apply the routes to our application
app.use('/', router);
//app.use(app.router);

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log("Ntalk no ar.");
});

load('models')
  .then('controllers')
  .then('routes')
  .into(app);
