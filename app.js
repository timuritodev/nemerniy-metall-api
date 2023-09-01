const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimit');

const { PORT = 3002, dbName = 'mongodb://localhost:27017/cardsdb' } = process.env;

const app = express();

mongoose.set({ runValidators: true });
mongoose.connect(dbName);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB 111');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use(bodyParser.json());

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));

app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' });
  next();
});

const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

app.set('config', config);
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/cards', require('./routes/cards'));
app.use('/cards/:id', require('./routes/cards'));

app.use('/blocks', require('./routes/blocks'));

app.use('/items', require('./routes/items'));
// app.use('/items/:id', require('./routes/items'));
app.use('/:id/:itemId', require('./routes/items'));

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
