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

module.exports.getItemById = (req, res, next) => {
  const itemId = req.params.id;
  Item.findOne({ id: itemId })
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(item);
    })
    .catch((err) => next(new ServerError(err.message)));
};

// module.exports.getItemById = (req, res, next) => {
//   const itemListId = req.params.id;
//   console.log(itemListId, '11');
//   Item.findOne({ id: itemListId })
//     .then((itemList) => {
//       const itemId = req.params.id;
//       console.log(itemId, '22');
//       if (!itemList) {
//         throw new NotFoundError('Список объектов не найден');
//       }
//       const selectedItem = itemList.data.find((item) => item.id === itemId);
//       if (!selectedItem) {
//         throw new NotFoundError('Объект не найден в списке');
//       }
//       res.send(selectedItem);
//     })
//     .catch((err) => next(new ServerError(err.message)));
// };
