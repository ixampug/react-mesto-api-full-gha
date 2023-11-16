const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { corsCheck } = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const handleErrors = require('./middlewares/handleErrors');
const { REGEX } = require('./utils/constants');
const { NotFoundError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to DB');
});
// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);
const app = express();

app.use(helmet());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(corsCheck);
app.use(requestLogger);
app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX),
  }),
}), createUser);

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);
app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('страница не существует'));
});
app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
