const router = require('express').Router();
const { getItems, getItemById } = require('../controllers/items');

router.get('/', getItems);
router.get('/:id/:itemId', getItemById);

module.exports = router;
