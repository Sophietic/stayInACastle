require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const mongoURI     = 'mongodb://localhost/stayinacastle'

mongoose
  .connect( process.env.MONGO_ATLAS_URI || mongoURI , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const app = express();

require('./configs/sessions')(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
    
hbs.registerPartials(__dirname + "/views/partials");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.locals.title = 'Stay In A Castle';

const index = require('./routes/index');
app.use('/', index);
const router = require("./routes/auth.routes");
app.use("/", router); 
const castles = require("./routes/castles.routes");
app.use("/", castles); 

module.exports = app;
