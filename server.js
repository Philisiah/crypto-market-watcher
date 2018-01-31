var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'ilovecharlesandcharleslovesmephilisiah', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); 

io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('m', function (data) {
            console.log(data);
        }
    );
});
app.listen(8080);
