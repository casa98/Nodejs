const express = require('express');

// Express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');  // It looks at views dir -by default- for my views

// Listen for requests
app.listen(8000);

// Routes
app.get('/', (req, res) => {
    // Send some dummy blogs to diaplay there
    const blogs = [
        {title: 'Android is complicated but cool', snippet: 'So maaaaaaaaaaaaaany version this OS has'},
        {title: 'Apple is nice but sucks', snippet: 'Owners only think of maaaaaaaaaking money and making devs poorer'},
        {title: 'Linux is so productive', snippet: 'My choice at the moment of developing, else Apple. Windows? ...'},
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new'});
});

// 404
// It's on bottom bc is executed if none of the above routes matched (it's sequencial code, so yeah)
app.use((req, res) => {
    res.render('404', {title: '404'});
});