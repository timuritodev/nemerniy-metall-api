const router = require('express').Router();
const { getAllitems, getAllitemsById } = require('../controllers/allitems');

router.get('/', getAllitems);
router.get('/:id', getAllitemsById);

module.exports = router;
