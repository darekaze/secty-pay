const ChargingControl = require('./controllers/ChargingController');
const PurchaseController = require('./controllers/PurchaseController');
// const isAuthenticated = require('./rules/isAuth');


const testConnect = (req, res) => {
  console.log('Testing api');
  res.send({ test: true });
};


module.exports = (app) => {
  app.get('/test', testConnect);

  app.post('/purchase', PurchaseController.purchase);

  app.post('/charging',
    ChargingControl.charging); // TODO: add verify middleware
};
