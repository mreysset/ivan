const Member = require('../models/member');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const crypto = require('crypto');
const argon2 = require('argon2');

//Render singin form
exports.member_signin_form = (req, res, next) => {
    res.render('member/signin', { messages: req.flash('error')});
};

//Render signup form
exports.member_signup_form = (req, res, next) => {
    res.render('member/signup', { messages: req.flash('error')});
};

//Save new member to db
exports.member_signup = async (req, res, next) => {
    crypto.randomBytes(32, function(err, salt) { 
        if(err) throw err; 
        argon2.hash(req.body.password, salt).then(hash => { 
            var member = new Member({
                first_name: req.body['first_name'],
                last_name: req.body['last_name'],
                username: req.body['username'],
                email: req.body['email'],
                password: hash
            });
            member.save(function (err) {
                if (err) next(err);
                next();
            });
        }); 
    }); 
};

//Display member's account
exports.member_account = (req, res, next) => { 
    Member.findById(req.user.id, (err, usr) => {
        if (err) return handleError(err);
        res.render('member/account', {data: usr});
    });
};