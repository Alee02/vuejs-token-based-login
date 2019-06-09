import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null
  },
  mutations: {
    SET_USER_DATA (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('http://localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log('user data is', data)
          commit('SET_USER_DATA', data)
        })
      }
  }
})
