const express = require('express');

const bcrypt = require('bcryptjs');

const router = express.Router();

const _ = require('lodash');

const User = require('../models/User').User;

const validateUser = require('../models/User').validateUser;

const asyncMiddleware = require('../middleware/async').asyncMiddleware;

//SIGNUP
router.post("", asyncMiddleware(async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("USER WITH THIS EMAIL ALREADY EXISTS");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender
    });
    const result = await User.create(user);
    if (!result) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
    res.status(201).send({ message: "Successfully Registered", user: _.pick(result, ["name", "email", "gender"]) });

}));











module.exports = router;