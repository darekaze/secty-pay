const path = require('path');

const seed = Math.floor(Math.random() * Math.floor(100000));

module.exports = {
  port: process.env.PORT || 8095,
  db: {
    database: process.env.DB_NAME || 'secPay',
    user: process.env.DB_USER || 'secPay',
    password: process.env.DB_PASS || 'secPay_secret',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      operatorsAliases: false,
      storage: path.resolve(__dirname, '../../secPay.sqlite'), // For SQLite
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secPay_secret',
  },
  keyOptions: {
    userIds: [{ seed }],
    numBits: 512,
    passphrase: process.env.PASSPHRASE || 'bob-passphrase',
  },
};
