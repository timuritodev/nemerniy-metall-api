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
  const itemListId = req.params.id;
  const itemId = Number(req.params.itemId);
  Item.findOne({ id: itemListId })
    .then((itemList) => {
      if (!itemList) {
        throw new NotFoundError('Список объектов не найден');
      }
      const selectedItem = itemList.data.find((item) => item.itemId === itemId);
      if (!selectedItem) {
        throw new NotFoundError('Объект не найден в списке');
      }
      res.send(selectedItem);
    })
    .catch((err) => next(new ServerError(err.message)));
};
