import Vue from 'vue';
import Vuex from 'vuex';
import credentialService from '@/services/credential.service';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: credentialService.getUser(),
  },
  getters: {
    userName(state) {
      return `${state.user.firstName} ${state.user.lastName}`
    },
    isAuthenticated(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      return state.user.role === 'Admin';
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {},
})
export default store