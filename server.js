const express = require('express');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');

const app = express();

// EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs');

const port = process.env.PORT || 8000;

// Routes 
app.use('/', require('./routes/index'));

//User Routes 
app.use('/users', require('./routes/users'));


app.listen(port, () => {
    console.log('connected at ' + port);
})