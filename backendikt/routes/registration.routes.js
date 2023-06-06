const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Post = require('../backendikt/models/posts');
const User = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Register User
router.post('/', async(req, res) => {
    const newEmail = req.body.email;
    const newHashPassword = bcrypt.hashSync(req.body.password, 10);
    const result = await User.findOne({ email : newEmail});
    if(result) {
        res.status(403);
        res.send({message: "email already exists"});
    } else{
        const newUser = new User ({
            email: newEmail,
            password: newHashPassword
        })
    await newUser.save();
    res.status(201);
    res.send(newUser);
   }});
        // Store hash in your password DB.

    // eine GET-Anfrage
    router.get('/', async(req, res) => {
    const allUsers = await User.find(); //find() ist ein Promise undn wird asynchron ausgeführt, und wartet das die funktion
    //ausgeführt werden kann oder es ein error gibt
    console.log(allUsers); //nicht notwendig
    res.send(allUsers);
    })
;
    

module.exports = router;