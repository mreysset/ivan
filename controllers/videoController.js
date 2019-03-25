const Videos = require('../models/video');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Display all videos
exports.video_list = (req,res) => {
    res.send('Video List');
};

//Display video page
exports.video_detail = (req,res) => {
    res.send('Video detail' + req.params.id);
};