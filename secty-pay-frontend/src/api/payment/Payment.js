import Api from '.';

export default {
  getPubKey() {
    return Api().get('purchase');
  },
  purchase(info) {
    return Api().post('purchase', { info });
  },
};
