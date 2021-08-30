import Vue from 'vue'
import App from './App'
import myRequest from './https/https.js'
// 自定义路由
import {router,RouterMount} from './router/index.js'
import "./static/iconfont/iconfont.css"
//引入vuex
import store from './store'

Vue.use(router)

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
    ...App,
    //挂载
    store,
})


RouterMount(app,router,'#app')

app.$mount()
