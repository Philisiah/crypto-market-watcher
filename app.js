var Debug = require('debug');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
// import favicon from 'serve-favicon';

// index from './routes/index';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const debug = Debug('crypto-martket-watcher:app');
app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* eslint no-unused-vars: 0 */
io.on('connection', (client) => {
  console.log('Client connected...');

  client.on('m', (data) => {
    console.log(data);
  }
  );
});

// Handle uncaughtException
/* onnprocess.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
}) */
server.listen(3000);
