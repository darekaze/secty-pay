// TODO: POST to handle payment request
// Use isAuth to identify user first (done in middleware)

const { User } = require('../models');
const ChargeService = require('../services/Charge');

module.exports = {
  async authorize(req, res) {
    try {
      const { data } = (await ChargeService.post('tokennn', {
        // some merchant data
      }));
      console.log(data);
      res.send(data);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  },
};
