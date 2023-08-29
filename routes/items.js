const router = require('express').Router();
const { getItems, getItemById } = require('../controllers/items');

router.get('/', getItems);
router.get('/:id', getItemById);

module.exports = router;
