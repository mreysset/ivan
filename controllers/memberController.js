const Member = require('../models/member');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Render singin form
exports.member_signin_form = (req, res, next) => {
    res.render('member/signin', { messages: req.flash('error')});
};

//Render signup form
exports.member_signup_form = (req, res, next) => {
    res.render('member/signup', { messages: req.flash('error')});
};

//Save new member to db
exports.member_signup = (req, res, next) => {
    var member = new Member({
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        username: req.body['username'],
        email: req.body['email'],
        password: req.body['password']
    });
    member.save(function (err) {
        if (err) {
            next(err);
        }
        next();
    });
};

//Display member's account
exports.member_account = (req, res, next) => { 
    Member.findById(req.user.id, (err, usr) => {
        if (err) return handleError(err);
        res.render('member/account', {data: usr});
    });
};