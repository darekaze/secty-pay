const Api = require('./_api');

module.exports = {
  post(token, pk) {
    return Api(token).post('charging', { pk });
  },
};
