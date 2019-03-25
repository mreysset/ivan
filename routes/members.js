const express = require('express');
const router = express.Router();
const member_controller = require('../controllers/memberController');

router.get('/', member_controller.member_profile);
router.get('/signin', member_controller.member_signin);
router.get('/signup', member_controller.member_dignup);

module.exports = router;