const ServerError = require('../errors/ServerError');
const { Allitems } = require('../models/allitem');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllitems = (req, res, next) => {
  Allitems.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(new ServerError(err.message)));
};

module.exports.getAllitemsById = (req, res, next) => {
  const cardId = req.params.id;
  Allitems.findOne({ id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(new ServerError(err.message)));
};
