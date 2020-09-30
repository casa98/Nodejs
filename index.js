const express = require('express');

// Express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');  // It looks at views dir -by default- for my views

// Listen for requests
app.listen(8000);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// 404
// It's on bottom bc is executed if none of the above routes matched (it's sequencial code, so yeah)
app.use((req, res) => {
    res.render('404');
});