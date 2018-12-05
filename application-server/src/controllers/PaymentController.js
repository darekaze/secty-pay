const jwt = require('jsonwebtoken');
const keypair = require('keypair');
const ChargeService = require('../services/Charge');
const {
  PurchaseHistory,
} = require('../models');

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
      const userId = req.user.id;
      const { paymentDetail } = (await ChargeService.post(
        req.body.AuthorizationToken,
        ppk.public,
      )).data;

      paymentDetail.UserId = userId;
      await PurchaseHistory.create(paymentDetail);
      res.send({ success: true });
    } catch (err) {
      res.status(400).send({
        error: 'Invalid Payment Authorization!',
      });
    }
  },
  async getPaymentHistory(req, res) {
    try {
      const UserId = req.user.id;
      const histories = await PurchaseHistory.findAll({
        where: { UserId },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      res.send(histories);
    } catch (err) {
      res.status(500).send({
        error: 'Error in fetching purchase histories',
      });
    }
  },
};
