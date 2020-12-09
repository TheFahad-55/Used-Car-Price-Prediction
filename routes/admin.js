const express = require('express');

const router = express.Router();

const User = require('../models/User').User;

const auth = require('../middleware/auth');

const admin = require('../middleware/admin');

const _ = require('lodash');


router.get('', [auth, admin], async(req, res) => {
    const users = await User.find({ _id: { $ne: '5fb78f610aafbc09f854cf2c' } });
    if (!users) {
        return res.status(404).send("No Users Exists");
    }
    res.status(200).send(users);

});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(404).send("User Not Found");
    }
    const result = await User.findByIdAndDelete({ _id: id });
    if (!result) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }

    res.status(200).json({ message: "Successfully Deleted", user: result });
});

















module.exports = router;