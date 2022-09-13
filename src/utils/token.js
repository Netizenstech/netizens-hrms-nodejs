const jwt = require('jsonwebtoken');

const CONFIG = require('../../config/config');

const { getMessage } = require('./messages');

const JWT_SECRET = CONFIG.jwt.secret;
const JWT_LIFE_TIME = CONFIG.jwt.lifeTime;

const generateToken = userId => new Promise((resolve, reject) => {
  jwt.sign({
    userId
  }, JWT_SECRET, {
    expiresIn: JWT_LIFE_TIME
  }, (error, token) => {
    if (error) {
      return reject(error);
    }
    resolve(token);
    return true;
  });
});

const getDecodedToken = token => new Promise((resolve, reject) => {
  try {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          reject(new Error(getMessage('SESSION_EXPIRED')));
        }
        reject(error);
      }

      if (!decodedToken.exp || !decodedToken.iat) {
        reject(new Error('Token had no \'exp\' or \'iat\' payload'));
      }
      resolve(decodedToken);
      resolve( true);
    });
  } catch (err) {
    // throw err;
    reject(err);
  }
      resolve( true);
});

module.exports = { generateToken, getDecodedToken };
