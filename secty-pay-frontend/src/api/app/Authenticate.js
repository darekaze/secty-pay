import AppApi from '.';

export default {
  register(credential, recaptcha) {
    return AppApi().post('register', { credential, recaptcha });
  },
  login(credential, recaptcha) {
    return AppApi().post('login', { credential, recaptcha });
  },
};
