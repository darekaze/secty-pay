const AuthController = require('./controllers/AuthController');

const AuthControl = require('./rules/AuthControl');
const isAuthenticated = require('./rules/isAuth');

module.exports = (app) => {
  app.post('/register',
    AuthControl.required,
    AuthControl.validate,
    AuthController.register);
  app.post('/login',
    AuthControl.required,
    AuthController.login);
};