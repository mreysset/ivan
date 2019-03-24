const express = require('express');
const router = express.Router();
const video_controller = require('../controllers/videoController');

router.get('/', video_controller.video_list);
router.get('/:id', video_controller.video_detail);

module.exports = router;