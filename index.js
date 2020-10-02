const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express app
const app = express();

// Connect to MongoDB
const mongodb_key = require('./mongo_key');
const { urlencoded } = require('express');
const { render } = require('ejs');
const dbURI = mongodb_key.mongodb_key;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');  // It looks at views dir -by default- for my views

// Listen for requests
// Moved to the DB Connection, so I'll only listen to, when the connection succeeds

// Some Middlewares
app.use(morgan('dev'));

// MIddleware for Static files
app.use(express.static('public'));

// Need this for my POST request (form)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Blog routes
app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404
// It's on bottom bc is executed if none of the above routes matched (it's sequencial code, so yeah)
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});