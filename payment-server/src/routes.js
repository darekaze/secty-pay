const testConnect = (req, res) => {
  console.log('Testing api');
  res.send({ test: true });
};

const index = (req, res) => {
  console.log('Homepage');
  res.send({ home: true });
};

module.exports = (app) => {
  app.get('/', index);
  app.get('/test', testConnect);
};