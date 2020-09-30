const express = require('express');

// Express app
const app = express();

// Listen for requests
app.listen(8000);

// Routes
app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/about', (req, res) => {
    res.send('About');
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404
// It's on bottom bc is executed if none of the above routes matched (it's sequencial code, so yeah)
app.use((req, res) => {
    res.status(404).send('404. Not found :c')
});