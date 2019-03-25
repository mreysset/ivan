const Members = require('../models/member');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Display member's profile
exports.member_profile = (req,res) => {
    res.send('Your profile');
};

exports.member_signin = (req,res) => {
    res.send('Sign in');
};

exports.member_signup = (req,res) => {
    res.send('Sign up');
}