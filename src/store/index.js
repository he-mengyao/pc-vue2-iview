import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carNum: 0,
        user: localStorage.getItem('user')
    },
    mutations: {
        setCarNum(state, data) {
            state.carNum = data
        },
        setUser(state, data) {
            state.user = data
        },
    },
    actions: {},
    modules: {}
})