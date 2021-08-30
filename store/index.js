import Vue from 'vue'
import Vuex from 'vuex'

// 自定义的方法/函数
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
    user:{},
    token: ''
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})