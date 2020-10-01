const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Express app
const app = express();

// Connect to MongoDB
const mongodb_key = require('./mongo_key')
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

// Mongoose and Mongo sandbox routes
app.get('/add-blog', (req, res) => {
    // Create instance of Blog document and save the blog there
    const blog = Blog({
        title: 'New blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    });
    // Now save to db, could take some time, returns a promise
    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

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
    res.status(404).render('404', {title: '404'});
});