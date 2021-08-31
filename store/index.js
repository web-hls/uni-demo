import Vue from 'vue'
import Vuex from 'vuex'

// 自定义的方法/函数
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
    user: {
        img: "/static/default.jpg",
        sex: 1,
        nackname: "阿珊~",
        birth_day: "2000-01-17",
        brief: "前端工程师，蓝桥签约作者",
    },
    token: ''
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})