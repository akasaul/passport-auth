const express = require('express');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

// DB Config 
const { MongoURI } = require('./config/keys')

mongoose.connect(MongoURI, { 
    useNewUrlParser: true
})
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err))

const app = express();

// EJS s
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser 
app.use(express.urlencoded({ extended: false }));

// Express Session 
app.use(session({
    secret: 'supersecretmega', 
    resave: true,
    saveUninitialized: true
}));

// Connect flash 
app.use(flash());


// Global Vars 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();

})

const port = process.env.PORT || 8000;

// Routes 
app.use('/', require('./routes/index'));

//User Routes 
app.use('/users', require('./routes/users'));


app.listen(port, () => {
    console.log('connected at ' + port);
})