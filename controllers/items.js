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
