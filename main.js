import Vue from 'vue'
import App from './App'
import myRequest from './https/https.js'

// 1.安装 uni-simple-router
// 2.main.js 中使用

// 自定义路由
import {router,RouterMount} from './router/index.js'
// 配置cookie
import cookies from 'vue-cookie'
import "./static/iconfont/iconfont.css"
//引入vuex
import store from './store'

import "./static/iconfont/iconfont.css"
Vue.use(router)

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$myRequest = myRequest
Vue.prototype.$cookies = cookies;
Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
    ...App,
    //挂载
    store,
})

//#ifdef H5 
RouterMount(app, router, '#app')
//#endif

//#ifndef H5
app.$mount()
//#endif
