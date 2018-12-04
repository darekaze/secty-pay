const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

function jwtSignUser(user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    algorithm: 'HS384',
    expiresIn: '3 days',
  });
}

function responseToFailure(res) {
  res.status(400).send({
    error: 'Incorrect username or password!',
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body.credential);
      const userJson = user.toJSON();
      delete userJson.password; // remove password for response
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      res.status(400).send({
        error: 'The name is already taken by someone...',
      });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body.credential;
      const user = await User.findOne({
        where: { username },
      });
      if (!user) responseToFailure(res);

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) responseToFailure(res);

      const userJson = user.toJSON();
      delete userJson.password; // remove password for response
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occur when trying to login',
      });
    }
  },
};
