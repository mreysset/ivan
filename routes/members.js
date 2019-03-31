const express = require('express');
const router = express.Router();
const passport = require('passport');
const member_controller = require('../controllers/memberController');

//Signin routes
router.get('/signin',member_controller.member_signin_form);
router.post('/signin', 
    passport.authenticate('local', {
        successRedirect: '/member/account',
        failureRedirect: '/member/signin',
        failureFlash: true})
           );

//Signup routes
router.get('/signup', member_controller.member_signup_form);
router.post('/signup',
    member_controller.member_signup, 
    passport.authenticate('local', {
    successRedirect: '/member/account',
    failureRedirect: '/member/signup',
    failureFlash: true})
           );

//Signout route
router.get('/signout', function(req, res){
  req.logout();
  res.redirect('back');
});

//Account routes
router.get('/account',  
           require('connect-ensure-login').ensureLoggedIn('/member/signin'),
           member_controller.member_account
          );

module.exports = router;