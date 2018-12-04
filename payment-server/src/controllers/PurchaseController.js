/* eslint-disable no-unused-expressions */
const jwt = require('jsonwebtoken');
const openpgp = require('openpgp');
const config = require('../config');

const bob = {};

function jwtSignInfo(info) {
  return jwt.sign(info, config.authentication.jwtSecret, {
    expiresIn: 10000, // expired in 10s
  });
}

module.exports = {
  getPubKey(req, res) {
    const keyOptions = {
      userIds: [{ seed: 51696808 }], // Make random in config
      numBits: 512,
      passphrase: 'bob-passphrase',
    };

    openpgp.generateKey(keyOptions).then((key) => {
      bob.privateKey = key.privateKeyArmored;
      bob.publicKey = key.publicKeyArmored;
    }).then(() => {
      res.send(bob.publicKey);
    });
  },
  async purchase(req, res) {
    try {
      const ciphertext = req.body.info.message;
      const privateKey = (await openpgp.key.readArmored(bob.privateKey)).keys[0];

      privateKey.decrypt('bob-passphrase');

      const options = {
        privateKeys: [privateKey],
        publicKeys: (await openpgp.key.readArmored(bob.publicKey)).keys,
        message: (await openpgp.message.readArmored(ciphertext)), // parse armored message
      };

      openpgp.decrypt(options).then(({ data }) => {
        res.send({
          clientToken: jwtSignInfo(JSON.parse(data)),
        });
      });
    } catch (error) {
      res.status(403).send({
        error: 'Something wrong happened..',
      });
    }
  },
  async charging(req, res) {
    try {
      // payment logic here (verify is done in middleware)
      console.log(req.body);
      res.send({ success: true });
    } catch (err) {
      res.status(400).send({
        error: 'Sonthing went wrong to do the actual payment...',
      });
    }
  },
};
