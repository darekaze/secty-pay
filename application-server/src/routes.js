const rateLimit = require('express-rate-limit');

const AuthController = require('./controllers/AuthController');
const PaymentController = require('./controllers/PaymentController');

const AuthControl = require('./rules/AuthControl');
const isAuthenticated = require('./rules/isAuth');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: {
    error: 'Too many request from this IP at a time...Please try again after 10 mins',
  },
});

module.exports = (app) => {
  app.post('/register',
    limiter,
    AuthControl.required,
    AuthControl.validate,
    AuthController.register);
  app.post('/login',
    limiter,
    AuthControl.required,
    AuthController.login);

  app.get('/payment',
    isAuthenticated,
    PaymentController.getMerchantToken);
  app.post('/payment',
    limiter,
    isAuthenticated,
    PaymentController.requestAuthorize);
  app.get('/purchase-history',
    isAuthenticated,
    PaymentController.getPaymentHistory);
};
