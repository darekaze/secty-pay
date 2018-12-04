import Api from '.';

export default {
  register(credential, recaptcha) {
    return Api().post('register', { credential, recaptcha });
  },
  login(credential, recaptcha) {
    return Api().post('login', { credential, recaptcha });
  },
};
