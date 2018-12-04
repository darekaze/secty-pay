const ChargingControl = require('./controllers/ChargingController');
// const isAuthenticated = require('./rules/isAuth');


const testConnect = (req, res) => {
  console.log('Testing api');
  res.send({ test: true });
};

module.exports = (app) => {
  app.get('/test', testConnect);

  app.post('/charging',
    ChargingControl.charging); // TODO: add verify middleware
};
