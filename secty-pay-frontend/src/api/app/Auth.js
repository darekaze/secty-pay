import Api from './index';
import Api2 from './creditcard';

export default {
  register(credential, recaptcha) {
    return Api().post('register', { credential, recaptcha });
  },
  login(credential, recaptcha) {
    return Api().post('login', { credential, recaptcha });
  },
  purchase(info, recaptcha) {
    return Api2().post('purchase', { info, recaptcha });
  },
};
