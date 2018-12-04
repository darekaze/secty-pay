import AppApi from '.';

export default {
  pay(clientToken) {
    return AppApi().post('payment', { clientToken });
  },
};
