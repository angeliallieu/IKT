//Dieser Router ist eine Middleware, verwaltet Routen und leitet requests weiter, empfängt Response-Objekte
const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
//const Post = require('../backendikt/models/posts');
const postRoutes = require('../models/posts');

// eine GET-Anfrage
router.get('/posts', async(req, res) => {
    const allPosts = await Post.find(); //find() ist ein Promise undn wird asynchron ausgeführt, und wartet das die funktion
    //ausgeführt werden kann oder es ein error gibt
    console.log(allPosts); //nicht notwendig
    res.send(allPosts);
})

// GET one post via id
router.get('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post);
    } catch {
        res.status(404);
        res.send({
            error: "Post does not exist!"
        });
    }
});

// POST one post
router.post('/posts', async(req, res) => {
    const newPost = new Post({
        //requests werden aus den Body ausgelesen
        title: req.body.title,
        location: req.body.location,
        image_id: req.body.image_id
    })
    await newPost.save(); //gelesenen Objekte werden in Datenbank gespeichert
    res.send(newPost); //und als response zurückgesendet
});

// PATCH (update) one post
router.patch('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })

        if (req.body.title) {
            post.title = req.body.title
        }

        if (req.body.location) {
            post.location = req.body.location
        }

        if (req.body.image_id) {
            post.image_id = req.body.image_id
        }

        await Post.updateOne({ _id: req.params.id }, post);
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});

// DELETE one post via id
router.delete('/posts/:id', async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});


module.exports = router; //muss exportiert werden, damit es auch von enderen Modulen genutzt werden kann
