const express = require('express');

const validateReview = require('../models/Review').validateReview;

const Review = require('../models/Review').Review;

const auth = require('../middleware/auth');

const admin = require('../middleware/admin');

const asyncMidleware = require('../middleware/async').asyncMiddleware;

const router = express.Router();
//@route    /api/reviews  POST 
//@description  Add new Review.
//@access         Private
router.post('', auth, asyncMidleware(async(req, res) => {
    const { error } = validateReview(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const review = new Review({
        stars: req.body.stars,
        carName: req.body.carName,
        user: req.user._id

    });

    const result = await Review.create(review);

    if (!result) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }

    res.status(201).send({ "message": "Review Added", review: result });


}));












module.exports = router;