const ServerError = require('../errors/ServerError');
const { Card } = require('../models/card');

module.exports.getCards = (req, res, next) => {
    Card.find()
        .then((cards) => {
            res.send({ cards });
        })
        .catch((err) => next(new ServerError(err.message)));
};


// const { Card } = require('../models/card');
// const ServerError = require('../errors/ServerError');

// module.exports.getCards = (req, res, next) => {
//   Card.findOne()
//     .then((cards) => {
//       if (!cards) {
//         return res.send({ data: [] }); // Возвращаем пустой массив, если данных нет
//       }
//       return res.send({ data: cards.cards }); // Возвращаем массив объектов cards
//     })
//     .catch((err) => next(new ServerError(err.message)));
// };
