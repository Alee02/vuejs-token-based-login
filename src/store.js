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
      localStorage.setItem('userData', JSON.stringify(payload))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        payload.token
      }`
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('http://localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    }
  }
})
