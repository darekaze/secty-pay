import PayApi from '.';

export default {
  getPubKey() {
    return PayApi().get('purchase');
  },
  getAuthorizeToken(info) {
    return PayApi().post('purchase', { info });
  },
};
