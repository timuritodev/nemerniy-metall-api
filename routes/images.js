const router = require('express').Router();
const { getImages } = require('../controllers/images');

router.get('/', getImages);

module.exports = router;
