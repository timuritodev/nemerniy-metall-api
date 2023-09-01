const router = require('express').Router();
const { getItems, getItemById } = require('../controllers/items');

router.get('/', getItems);
router.get('/:id', getItemById);

module.exports = router;

// // const router = require('express').Router();
// // const { getItems, getItemById } = require('../controllers/items');

// // router.get('/', getItems);
// // router.get('/:itemListId/:itemId', getItemById); // Обновленный роут

// // module.exports = router;

// const router = require('express').Router();
// const { getItems, getItemById } = require('../controllers/items');

// router.get('/', getItems);
// router.get('/:parentId/:itemId', getItemById); // Updated route definition

// module.exports = router;
