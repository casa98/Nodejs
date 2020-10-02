const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

app.get('/blogs', (req, res) => {
    // Get all blogs from DB
    Blog.find().sort({ createdAt: -1 })     // From newest to oldest post
    .then((result) => {
        // Pass in to the index.ejs view
        res.render('index', {
            title: 'All blogs',
            blogs: result
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

app.post('/blogs', (req, res) => {
    // This contains the data from the form fields
    console.log(req.body);
    // Set in on the model
    const blog = new Blog(req.body);
    // Save it on the DB
    blog.save()
        .then((result) => {
            // Successful, redirect to home page
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new'});
});

app.get('/blogs/:id', (req, res) => {
    // Get the id of the selected blog
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        // Go to Details view
        res.render('details', {title: 'Blog details', blog: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
        console.log(err);
    });
});

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