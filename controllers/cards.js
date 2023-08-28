const ServerError = require('../errors/ServerError');
const { Card } = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(new ServerError(err.message)));
};

module.exports.getCardById = (req, res, next) => {
  const cardId = req.params.id;
  Card.findOne({ id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(new ServerError(err.message)));
};
