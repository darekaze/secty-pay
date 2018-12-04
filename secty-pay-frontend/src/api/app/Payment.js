import AppApi from '.';

export default {
  get() {
    return AppApi().get('payment');
  },
  pay(clientToken) {
    return AppApi().post('payment', { clientToken });
  },
};
