const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    // This contains the data from the form fields
    console.log(req.body);
    // Set in on the model
    const blog = new Blog(req.body);
    // Save it on the DB
    blog.save()
        .then((result) => {
            // Successful, redirect to home page
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create new'});
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/' });
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;