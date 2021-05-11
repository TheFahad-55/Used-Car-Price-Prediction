const mongoose = require("mongoose");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: [true, "Stars are required"],
  },
  carName: {
    type: String,
    required: [true, "CarName is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

function validateReview(review) {
  const schema = Joi.object({
    stars: Joi.string().required(),
    carName: Joi.string().required(),
  });
  const result = schema.validate(review);
  return result;
}

const Review = mongoose.model("Review", reviewSchema);

module.exports.Review = Review;
module.exports.validateReview = validateReview;
