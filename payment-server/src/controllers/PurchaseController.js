/* eslint-disable no-unused-expressions */
const openpgp = require('openpgp');

const bob = {};
module.exports = {
  async purchase(req, res) {
    try {
      // captcha
      if (req.body.info.pubkey === 't') {
        const { pubkey } = req.body.info;
        const passphrase = 'bob-passphrase';
        const keyOptions = {
          userIds: [{ seed: 51696808 }],
          numBits: 512,
          passphrase: 'bob-passphrase',
        };


        openpgp.generateKey(keyOptions).then((key) => {
          bob.privateKey = key.privateKeyArmored;
          bob.publicKey = key.publicKeyArmored;
        }).then(() => {
          res.send(bob.publicKey);
        });
      }
      if (req.body.info.message) {
        const ciphertext = req.body.info.message;
        const privateKey = (await openpgp.key.readArmored(bob.privateKey)).keys[0];
        privateKey.decrypt('bob-passphrase');
        const options = {
          privateKeys: [privateKey],
          publicKeys: (await openpgp.key.readArmored(bob.publicKey)).keys,
          message: (await openpgp.message.readArmored(ciphertext)), // parse armored message
        };
        // res.send(JSON.stringify(options));
        openpgp.decrypt(options).then((plaintext) => {
          res.send(plaintext.data);
        });
      }
    } catch (error) {
      res.status(403).send({
        error: 'Something wrong happened..',
      });
    }
  },
};
