import AuthenticateService from '../../api/app/Authenticate';
import {
  LOGIN, LOGOUT, REGISTER,
} from '../types/actions';
import {
  SET_AUTH, PURGE_AUTH, SET_ERROR,
} from '../types/mutations';

const state = {
  token: null,
  user: {},
  error: null,
};

const getters = {
  currentUser(st) {
    return st.user;
  },
  isAuthenticated(st) {
    return !!(st.token);
  },
};

const actions = {
  [LOGIN]({ commit }, { credential, recaptcha }) {
    commit(SET_ERROR, null);
    return new Promise((resolve) => {
      AuthenticateService.login(credential, recaptcha)
        .then(({ data }) => {
          commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          commit(SET_ERROR, response.data.error);
        });
    });
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
  [REGISTER]({ commit }, { credential, recaptcha }) {
    commit(SET_ERROR, null);
    return new Promise((resolve) => {
      AuthenticateService.register(credential, recaptcha)
        .then(({ data }) => {
          commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          commit(SET_ERROR, response.data.error);
        });
    });
  },
};

const mutations = {
  [SET_ERROR](st, error) {
    st.error = error;
  },
  [SET_AUTH](st, data) {
    st.token = data.token;
    st.user = data.user;
    st.error = null;
  },
  [PURGE_AUTH](st) {
    st.token = null;
    st.user = null;
    st.error = null;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
