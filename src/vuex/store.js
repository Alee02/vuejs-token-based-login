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
    },
    CLEAR_USER_DATA (state) {
      // state.userData = null //
      localStorage.removeItem('user')
      // axios.defaults.headers.common['Authorization'] = null //..
      location.reload()
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('http://localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login ({ commit }, credentials) {
      return axios
        .post('http://localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      // double bang operator here returns a boolean regarding userData's existence//
      return !!state.userData
    }
  }
})
