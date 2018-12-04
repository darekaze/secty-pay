const jwt = require('jsonwebtoken');
const keypair = require('keypair');
const ChargeService = require('../services/Charge');

const ppk = keypair();

function jwtSignMerchant(merchant) {
  return jwt.sign(merchant, ppk.private, { algorithm: 'RS384' });
}

module.exports = {
  getMerchantToken(req, res) {
    const merchant = {
      id: 11123,
      name: 'TheMerchant',
    };
    res.send({
      merchantToken: jwtSignMerchant(merchant),
    });
  },
  async requestAuthorize(req, res) {
    try {
      const { data } = (await ChargeService.post(
        req.body.AuthorizationToken,
        ppk.public,
      ));
      // TODO: Response to frontend and to database
      // check weather the response is valid

      // if not valid Handle wrong data response from payment server

      // else continue (add success data to database)

      res.send(data);
    } catch (err) {
      res.status(400).send({
        error: 'Something wrong happened...',
      });
    }
  },
};
