const ServerError = require('../errors/ServerError');
const { Block } = require('../models/block');

module.exports.getBlocks = (req, res, next) => {
  Block.find()
    .then((blocks) => {
      res.send(blocks);
    })
    .catch((err) => next(new ServerError(err.message)));
};
