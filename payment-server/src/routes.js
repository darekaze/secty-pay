const PurchaseController = require('./controllers/PurchaseController');
const tokenVerification = require('./policies/tokenVerification');

const testConnect = (req, res) => {
  console.log('Testing api');
  res.send({ test: true });
};

module.exports = (app) => {
  app.get('/test', testConnect);

  app.post('/purchase',
    PurchaseController.purchase);
  app.post('/charging',
    // tokenVerification,
    PurchaseController.charging);
};
