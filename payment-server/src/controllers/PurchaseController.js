/* eslint-disable no-unused-expressions */
const jwt = require('jsonwebtoken');
const openpgp = require('openpgp');
const config = require('../config');

const bob = {};

function jwtSignInfo(info) {
  return jwt.sign(info, config.authentication.jwtSecret, {
    algorithm: 'HS512',
    expiresIn: 10000, // expired in 10s
  });
}

module.exports = {
  getPubKey(req, res) {
    if (Object.keys(bob).length === 0) { // if no pub-pri key pair
      openpgp.generateKey(config.keyOptions).then((key) => {
        bob.privateKey = key.privateKeyArmored;
        bob.publicKey = key.publicKeyArmored;
      }).then(() => {
        res.send(bob.publicKey);
      });
    } else {
      res.send(bob.publicKey);
    }
  },
  async authorize(req, res) {
    try {
      const ciphertext = req.body.info.message;
      const privateKey = (await openpgp.key.readArmored(bob.privateKey)).keys[0];

      privateKey.decrypt(config.keyOptions.passphrase);

      const options = {
        privateKeys: [privateKey],
        publicKeys: (await openpgp.key.readArmored(bob.publicKey)).keys,
        message: (await openpgp.message.readArmored(ciphertext)), // parse armored message
      };

      openpgp.decrypt(options).then(({ data }) => {
        // TODO: Validate credit card data with mock database
        if (JSON.parse(data).creditCard.cardnumber !== '1111111111111111' || JSON.parse(data).creditCard.expiry !== '1111'
        || JSON.parse(data).creditCard.cvc !== '111') {
          res.status(401).send({ // If fail
            error: 'Invalid credit card information',
          });
        } else {
          res.send({ // If success
            AuthorizationToken: jwtSignInfo(JSON.parse(data)),
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        error: 'Connection Interrupted!',
      });
    }
  },
  charging(req, res) {
    try {
      const [_, token] = (req.headers.authorization).split(' ');
      const decodedInfo = jwt.verify(token, config.authentication.jwtSecret);
      const merchantData = jwt.verify(decodedInfo.merchantIdentity, req.body.pk);

      if (merchantData.id !== 11123 || merchantData.name !== 'TheMerchant') {
        res.sendStatus(401);
        return;
      }
      res.send({ success: true }); // TODO: return payment detail for record in history
    } catch (err) {
      res.status(403).send({
        error: 'No access allowed!',
      });
    }
  },
};
