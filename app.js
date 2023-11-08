// const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const uuid = require('uuid');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimit');

// const { PORT = 3002, dbName = 'mongodb://127.0.0.1:27017/cardsdb' } = process.env;
const { PORT = 3002, dbName = 'mongodb://localhost:27017/cardsdb' } = process.env;

const app = express();

mongoose.set({ runValidators: true });
mongoose.connect(dbName);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
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

// const url = 'mongodb://127.0.0.1:27017/';
// const mongoClient = new MongoClient(url);

// async function run() {
//   try {
//     await mongoClient.connect();
//     const db = mongoClient.db('cardsdb');
//     const collection = db.collection('sessions');
//     const data = { name: 'Tom', age: 28 };
//     const result = await collection.insertOne(data);
//     console.log(result);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongoClient.close();
//   }
// }

app.use(session({
  secret: 'your-secret-key',
  key: 'sida',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/cardsdb',
  }),
  cookie: {
    name: 'tim',
    id: uuid.v4(),
    value: uuid.v4(),
    secure: false, // Установите true, если вы используете HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  },
}));

app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('id: ', req.session.cookie.id);
  console.log('value:', req.session.cookie.value);
  console.log('name:', req.session.name);
  console.log('sid:', req.session.store);
  console.log('sid:', req.session.cookie.store);
  // run().catch(console.error);
  // res.session.save();

  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/cards', require('./routes/cards'));
app.use('/cards/:id', require('./routes/cards'));

app.use('/allitems', require('./routes/allitems'));
app.use('/allitems/:id', require('./routes/allitems'));

app.use('/blocks', require('./routes/blocks'));

app.use('/items', require('./routes/items'));
app.use('/items/:id/:itemId', require('./routes/items')); // ?

app.use('/sendemail', require('./routes/mailers'));

app.use('/images', require('./routes/images'));

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
