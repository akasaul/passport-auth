const express = require('express');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// DB Config 
const { MongoURI } = require('./config/keys')

mongoose.connect(MongoURI, { 
    useNewUrlParser: true
})
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err))

const app = express();

// EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser 
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// Routes 
app.use('/', require('./routes/index'));

//User Routes 
app.use('/users', require('./routes/users'));


app.listen(port, () => {
    console.log('connected at ' + port);
})