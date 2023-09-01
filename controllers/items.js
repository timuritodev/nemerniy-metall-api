/* eslint-disable prefer-destructuring */
const ServerError = require('../errors/ServerError');
const { Item } = require('../models/item');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getItems = (req, res, next) => {
  Item.find()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => next(new ServerError(err.message)));
};

// module.exports.getItemById = (req, res, next) => {
//   const itemId = req.params.id;
//   Item.findOne({ id: itemId })
//     .then((item) => {
//       if (!item) {
//         throw new NotFoundError('Карточка не найдена');
//       }
//       res.send(item);
//     })
//     .catch((err) => next(new ServerError(err.message)));
// };

module.exports.getItemById = (req, res, next) => {
  const itemListId = req.params.id;
  // const itemId = req.params.itemId;
  const itemId = Number(req.params.itemId);
  console.log(itemListId);
  console.log(itemId);
  Item.findOne({ id: itemListId })
    .then((itemList) => {
      console.log(itemList.data, 'asdas');
      if (!itemList) {
        throw new NotFoundError('Список объектов не найден');
      }
      // const selectedItem = itemList.data.find((item) => item.itemId === itemId);
      const selectedItem = itemList.data.find((item) => {
        console.log('Comparing itemId:', item.itemId, 'to', itemId);
        console.log(typeof item.itemId, 'to', typeof itemId);
        return item.itemId === itemId;
      });
      console.log(selectedItem, 'bababa');
      if (!selectedItem) {
        throw new NotFoundError('Объект не найден в списке');
      }

      res.send(selectedItem);
    })
    .catch((err) => next(new ServerError(err.message)));
};
