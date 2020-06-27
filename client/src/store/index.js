import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const baseURL = 'https://e-commerce-atma.herokuapp.com';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    updateId: 0,
    isLogin: false,
    currentLogin: ""
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    // SET_UPDATE(state, id) {
    //   state.updateId = id;
    // },
    SET_LOGIN(state, email) {
      this.isLogin = true
    }
  },
  actions: {
    fetchProducts(context, payload) {
      axios({
        method: 'get',
        url: `${baseURL}/products`,
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          // console.log(response.data.data);
          this.commit('SET_PRODUCTS', response.data)
        })
        .catch((error) => {
          console.log(error.response)
          // console.log(error.response.data.message);
        });
    },
    setLogin(context, payload) {
      this.commit('SET_LOGIN')
    }
    // deleteProduct(context, payload) {
    //   // console.log(payload)
    //   this.commit('SET_DELETE', payload.id)
    // }

  },
  modules: {
  },
});
