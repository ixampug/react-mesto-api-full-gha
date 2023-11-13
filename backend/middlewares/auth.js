const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw new UnauthorizedError('нужно авторизировться');
  // }

  const token = req.headers.authorization;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('неправильный токен');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
