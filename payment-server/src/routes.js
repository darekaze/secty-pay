const rateLimit = require('express-rate-limit');
const PurchaseController = require('./controllers/PurchaseController');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many payment request from this IP at a time...Please try again after 10 mins',
  },
});

module.exports = (app) => {
  app.get('/purchase',
    PurchaseController.getPubKey);
  app.post('/purchase',
    limiter,
    PurchaseController.authorize);
  app.post('/charging',
    limiter,
    PurchaseController.charging);
};
