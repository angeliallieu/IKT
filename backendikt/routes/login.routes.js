const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Post = require('../backendikt/models/posts');
const User = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();

// LOGIN user
router.post ('/', async(req, res) => {
    const result = await User.findOne({email : req.body.email });
    console.log(result)
    if(result && bcrypt.compareSync(req.body.password, result.password)) {
        res.status(202); 
        res.send(result);
    } else {
        res.status(401);
        res.send ({ message: "Not logged in" });
    }
});

module.exports = router;