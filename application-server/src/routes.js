const AuthController = require('./controllers/AuthController');
const PaymentController = require('./controllers/PaymentController');

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

  app.get('/payment',
    isAuthenticated,
    PaymentController.getMerchantToken);
  app.post('/payment',
    isAuthenticated,
    PaymentController.requestAuthorize);
};
