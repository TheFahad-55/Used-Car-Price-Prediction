const express = require('express');

const router = express.Router();

const User = require('../models/User').User;

const Review = require('../models/Review').Review;

const asyncMiddleware = require('../middleware/async').asyncMiddleware;

const auth = require('../middleware/auth');

const admin = require('../middleware/admin');

const _ = require('lodash');

const validateObjectId = require('../utilities/object').validateObjectId;

//Get All the Users..
router.get('/users', [auth, admin], asyncMiddleware(async(req, res) => {
    const users = await User.find({ _id: { $ne: '5fe469560cdd8015e4973dc6' } });
    if (!users) {
        return res.status(404).send("No Users Exists");
    }
    res.status(200).send(users);

}));

//Delete Specific User.....
router.delete('/users/:id', asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).send("No Such User Exists");
    }
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
}));

//Get All Reviews........

router.get('/reviews', [auth, admin], asyncMiddleware(async(req, res) => {
    const reviews = await Review.find();
    if (!reviews) {
        return res.status(404).send("No Reviews Found");
    }
    res.status(200).send(reviews);


}));

//Delete Specific Review..
router.delete("/reviews/:id", [auth, admin], asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).send("No Such Review Exists");
    }
    const id = req.params.id;
    const review = await Review.findOne({ _id: id });
    if (!review) {
        return res.status(404).send("Review Not Found");
    }
    const result = await User.findByIdAndDelete({ _id: id });
    if (!result) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }

    res.status(200).json({ message: "Successfully Deleted", review: result });

}));












module.exports = router;