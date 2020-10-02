const Blog = require('../models/blog');

const blog_index = (req, res) => {
    // Get all blogs from DB
    Blog.find().sort({ createdAt: -1 })     // From newest to oldest post
    .then((result) => {
        // Pass in to the index.ejs view
        res.render('blogs/index', {
            title: 'All blogs',
            blogs: result
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    // Get the id of the selected blog
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        // Go to Details view
        res.render('blogs/details', {title: 'Blog details', blog: result});
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create new'});
}

const blog_create_post = (req, res) => {
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
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/' });
    })
    .catch((err) => {
        console.log(err);
    });
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};