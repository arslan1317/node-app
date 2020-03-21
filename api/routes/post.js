
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authorizationToken = require('../middleware/auth');

const Post = require('../models/post');
// Get all posts
router.get('/', authorizationToken, (req, res, next) => {
    Post.find({createdBy: req.userData.email})
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Insert data in Posts 
router.post('/', authorizationToken , (req, res, next) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        createdBy: req.userData.email
    });
    post.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling post requests',
            createdPost: post
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Find post using postId
router.get('/:postId', authorizationToken, (req, res, next) => {
    const id = req.params.postId;
    Post.fineOne({
        $and: [
            {_id: id},
            {createdBy: req.userData.email}
        ]
    })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            }   else {
                    res.status(404).json({message: 'No valid entry found for provided Id'})
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Update post using postId
router.patch('/:postId', (req, res, next) => {
    const id  = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

    }
    Post.update({
        $and: [
            {_id: id},
            {createdBy: req.userData.email}
        ]
    }, {$set: updateOps })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

// Delete Post using postId
router.delete('/:postId', authorizationToken, (req, res, next) => {
    const id  = req.params.postId;
    Post.findOneAndDelete({
        $and: [
            {_id: id},
            {createdBy: req.userData.email}
        ]
    }).exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Delete all Posts
router.delete('/', authorizationToken, (req, res, next) => {
    Post.remove({createdBy: req.userData.email}).exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;