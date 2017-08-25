require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const {renderError} = require('./server/utils');
const routes = require('./server/routes');

const app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/views/common', __dirname + '/views/contacts', __dirname + '/views/partials', __dirname + '/views/users']);

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request, response, next) => {
  response.locals.query = '';
  next();
});
app.use(logger('dev'));
app.use(session({
  store: new (require('connect-pg-simple')(session))(),
  key: 'user_id',
  secret: process.env.DEV_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 600000 }
}));
app.use(cookieParser());


//Routes
app.use('/', routes);

//404
app.use((request, response) => {
  response.render('not_found');
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
