const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var Post = require('./models/Post.js');
var Log = require('./models/Log.js');
var Coment = require('./models/Comment.js');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/posts');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.get( '/posts', function(req, res){
    Post.find((err, posts) => {
        if(err)
            console.log(err);
        else
            res.json(posts);
    });
});

router.get( '/comments', function(req, res){
    Coment.find((err, coments) => {
        if(err)
            console.log(err);
        else
            res.json(coments);
    });
});

router.get( '/logs', function(req, res){
    Log.find((err, logs) => {
        if(err)
            console.log(err);
        else
            res.json(logs);
    });
});

router.get( '/posts/:id', function(req, res){
    Post.findById(req.params.id, (err, post) => {
        if(err)
            console.log(err);
        else
            res.json(post);
    });
});

router.get( '/logs/:id', function(req, res){
    Log.findById(req.params.id, (err, log) => {
        if(err)
            console.log(err);
        else
            res.json(log);
    });
});

router.get( '/comments/:id', function(req, res){
    Coment.find({"post": req.params.id}, (err, coment) => {
        if(err)
            console.log(err);
        else
            res.json(coment);
    });
});

router.post( '/posts/add', function(req, res){
    var post = new Post(req.body);
    post.save()
        .then(log => {
            res.status(200).json({'post': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new post');
        });
});

router.post( '/logs/add', function(req, res){
    var log = new Log(req.body);
    log.save()
        .then(log => {
            res.status(200).json({'log': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new log');
        });
});

router.post( '/comments/add', function(req, res){
    var coment = new Coment(req.body);
    coment.save()
        .then(log => {
            res.status(200).json({'comment': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new coment');
        });
});


router.post( '/posts/update/:id', function(req, res){
    Post.findById(req.params.id, (err, post) => {
        if(!post)
            return next(new Error('Could not load document'));
        else {
            post.title = req.body.title;
            post.description = req.body.description;
            post.responsible = req.body.responsible;

            post.save().then(post => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


router.get( '/posts/delete/:id', function(req, res){
    Post.findByIdAndRemove({_id: req.params.id}, (err, post) => {
        if(err)
            res.json(err);
        else
           res.json('Remove sucessfully'); 
    });
});

router.get( '/comments/delete/:id', function(req, res){
    Coment.findByIdAndRemove({_id: req.params.id}, (err, post) => {
        if(err)
            res.json(err);
        else
           res.json('Comment Removed sucessfully'); 
    });
});


app.use('/', router);

app.listen(4000, () => console.log('Express server running on port:4000'));
