const router = require('express').Router();
const { getBlocks } = require('../controllers/blocks');

router.get('/', getBlocks);

module.exports = router;
