// 引入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 自定义的方法/函数
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

// 设置全局访问的 state 对象
// 要设置初始属性值
const state = {
    user: {
        id: 1,
        img: "/static/default.jpg",
        sex: 1,
        nackname: "阿珊~",
        birth_day: "2000-01-17",
        brief: "前端工程师，蓝桥签约作者",
    },
    token: ''
}

// 新建一个仓库并导出对应变量
export default new Vuex.Store({
    state,
    mutations,
    actions
})