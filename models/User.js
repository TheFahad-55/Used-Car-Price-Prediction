const mongoose = require('mongoose');

const Joi = require('joi');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

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
    gender: {
        type: String,
        required: [true, "Gender is required"]
    },
    resetPasswordToken: String,
    resetTokenExpire: Date,
    isAdmin: Boolean

});

userSchema.methods.getJsonToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.PRIVATE_KEY);
    return token;
}

userSchema.methods.getResetPasswordToken = function() {
    //Create Token......
    const resetToken = crypto.randomBytes(20).toString('hex');
    //HASH THE TOKEN...
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetTokenExpire = Date.now() + 10 * 60 * 1000; //10 Minutes Expiration time......
    return resetToken;

}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(1300),
        gender: Joi.string().required()
    });
    const result = schema.validate(user);
    return result;
}



module.exports.User = User;
module.exports.validateUser = validateUser;