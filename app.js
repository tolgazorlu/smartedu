const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//DATABASE CONNECTION
mongoose
  .connect('mongodb://localhost:27017/smartedu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected!');
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/smartedu',
    }),
  })
);

global.userIN = null;

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute);

//LISTEN
app.listen(3000, () => {
  console.log('Port çalıştı!');
});
