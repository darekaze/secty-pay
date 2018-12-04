const ChargeService = require('../services/Charge');

module.exports = {
  async authorize(req, res) {
    try {
      // TODO: POST to handle payment request
      // Get token from req
      const { clientToken } = req.body; // need confirm
      // do the actual charging request with the client credit card token
      const { data } = (await ChargeService.post(clientToken, {
        // merchant secrets
      }));
      // check weather the response is valid

      // if not valid Handle wrong data response from payment server

      // else continue (add success data to database)

      console.log(data);
      res.send(data);
    } catch (err) {
      res.status(400).send({
        error: 'Something wrong happened...',
      });
    }
  },
};
