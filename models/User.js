const mongoose = require('mongoose');

const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        pattern: [
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "PLEASE ENTER VALID EMAIL",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be at least 5 characters"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    gender: {
        type: Boolean,
        required: [true, "Gender is required"]


    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3).max(1300),
        country: Joi.string().required(),
        gender: Joi.boolean().required()
    });
    const result = schema.validate(user);
    return result;
}



module.exports.User = User;
module.exports.validateUser = validateUser;