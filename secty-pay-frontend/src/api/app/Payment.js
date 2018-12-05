import AppApi from '.';

export default {
  get() {
    return AppApi().get('payment');
  },
  pay(AuthorizationToken) {
    return AppApi().post('payment', { AuthorizationToken });
  },
  history() {
    return AppApi().get('purchase-history');
  },
};
