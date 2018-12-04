const Api = require('./_api');

module.exports = {
  post(token, merchant) {
    return Api(token).post('charging', merchant);
  },
};
