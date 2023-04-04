import axios from "axios";

export default {
  namespaced: true,

  state: {
    payPalToken: '',
  },

  getters: {
    getPayPalToken: (state) => state.payPalToken,
  },

  mutations: {
    setPayPalToken(state, token) {
      state.payPalToken = token;
    },
  },

  actions: {
    async getPayPalToken({commit}) {
      const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        new URLSearchParams({
          'grant_type': 'client_credentials'
        }),
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US'
          },
          auth: {
            username: 'AUFWOPGoQg0UA5q1ZZNfKHf0sED52nud3cJn-tpZaONEuVKKJvXErZGKr0PpmlUs_l0GMkl1nC8hSyzY',
            password: 'EJjYr1XsQbvuL3syDp0Vv_546ib7fTnihmoc3esGzbpmcAR7dlampH1hs2Nb9IrmH2OaKrZALv2pZF-C'
          }
        }
      );
      commit('setPayPalToken', response.data.access_token);
    },
  },
};
