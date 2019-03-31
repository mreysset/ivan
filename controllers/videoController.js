const Videos = require('../models/video');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Display all videos
exports.video_list = (req, res, next) => {
    res.render('videos/videos');
};

//Display video page
exports.video_detail = (req, res, next) => {
    res.rend('videos/video/' + req.params.id);
};