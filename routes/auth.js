const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const crypto = require('crypto')

const _ = require('lodash');

const sendEmail = require('../utilities/email').sendsEmail;


const Joi = require('joi');

const User = require('../models/User').User;

const asyncMiddleware = require('../middleware/async').asyncMiddleware;

const auth = require('../middleware/auth');

//@route    /api/auth  POST 
//@description  Login,Authenticate  user.
//@access         Public
router.post('', asyncMiddleware(async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD" });
    }


    const token = user.getJsonToken();
    if (!token) {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
    res.status(200).json({ token: token });
}));

//@route    /api/auth  GET 
//@description  Get Curretly Logged In User.
//@access         Private.
router.get('/me', auth, asyncMiddleware(async(req, res) => {
    const id = req.user._id;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.staus(404).send("NOT FOUND");
    }
    res.status(200).send({ user: _.pick(user, ['name', 'email', 'gender']) });
}));

//@route    /api/auth/forgot-password  POST 
//@description  Forgot Password.
//@access         Private.
router.post('/forgot-password', asyncMiddleware(async(req, res) => {
    const { error } = validateEmail(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send("NO SUCH USER WITH THIS EMAIL");
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();
    //CREATE RESET URL...........
    const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;
    const message = `
        <h1>Hi,${user.name}</h1>
        <p>you are recieving this email because  (you or someone else) has reuqested the reset of the password.</p>
        <p>Please click this link to reset your password</p><a href=${resetUrl}>${resetUrl}</a><br><br> 
        <p>if you did'nt request reset password,please ignore this email or reply us to let us know.This password reset
        is only valid for next 30 minutes.</p> <br>
        <p>Thanks</p>
        <h2>NgCars</h2>
        <p>Contact us through email:ngcars700@gmail.com</p>
    `;
    //Send Email..
    try {
        await sendEmail({
            subject: 'RESET PASSWORD',
            email: user.email,
            message: message
        });
    } catch (err) {
        console.log("COULD.NT SEND THE EMAIL", err);
        user.resetPasswordToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();

    }
    res.status(200).json({ message: "Email Sent" });
}));

//@route    /api/auth/forgot-password/:token  PUT 
//@description  Resest Password.
//@access         Public
router.put('/forgot-password/:token', asyncMiddleware(async(req, res) => {
    if (!req.params.token) {
        return res.status(400).send("NOT TOKEN PROVIDED");
    }
    //hash the token...
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //Checking the token expiration....
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetTokenExpire: {
            $gt: Date.now()
        }
    });
    if (!user) {
        return res.status(400).send("INVALID TOKEN");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    const token = user.getJsonToken();
    if (!token) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
    res.status(200).send(token);
}));





function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(1300)
    });
    const result = schema.validate(user);
    return result;

}

function validateEmail(email) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
    });
    const result = schema.validate(email);
    return result;
}


module.exports = router;