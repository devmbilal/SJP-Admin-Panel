require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5000;

connectDB();


// Templating Engine   
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/journey'));

//Handlle 404
app.get('*', (req, res) => {  
    res.render('404');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});