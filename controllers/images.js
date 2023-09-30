const ServerError = require('../errors/ServerError');
const { Image } = require('../models/images');

module.exports.getImages = (req, res, next) => {
  Image.find()
    .then((images) => {
      res.send(images);
    })
    .catch((err) => next(new ServerError(err.message)));
};
