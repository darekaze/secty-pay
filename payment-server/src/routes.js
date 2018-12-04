const PurchaseController = require('./controllers/PurchaseController');
const tokenVerification = require('./policies/tokenVerification');

const testConnect = (req, res) => {
  console.log('Testing api');
  res.send({ test: true });
};

module.exports = (app) => {
  app.get('/', testConnect);

  app.get('/purchase',
    PurchaseController.getPubKey);
  app.post('/purchase',
    PurchaseController.authorize);
  app.post('/charging',
    // tokenVerification,
    PurchaseController.charging);
};
