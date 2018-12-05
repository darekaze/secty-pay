/* eslint-disable array-callback-return */
const Promise = require('bluebird');

const {
  sequelize,
  User,
  PurchaseHistory,
} = require('../src/models');
const users = require('./users.json');
const purchaseHistories = require('./purchaseHistories.json');

sequelize.sync({ force: true })
  .then(async () => {
    await Promise.all(
      users.map((user) => {
        User.create(user);
      }),
    );

    await Promise.all(
      purchaseHistories.map((history) => {
        PurchaseHistory.create(history);
      }),
    );
  });
