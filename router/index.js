// 3.router.js
// uni-simple-router 是 专为 uni-app 打造的路由管理器。
// 它保留了 Vue-router 完全相似的书写风格

import { RouterMount,createRouter } from 'uni-simple-router';
import store from '../store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log(to)
	console.log("全局路由前置守卫")
    if (to.name != 'login' && to.name != 'register' && !store.state.token) {
        console.log(2)
        next({
            name: "login",
            params: {
                msg: '我拦截了tab5并重定向到了路由4页面上',
            },
            NAVTYPE: 'push'
        });
    } else{
        console.log(1)
    next();
  }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
	console.log("全局路由后置守卫")
})

export {
	router,
	RouterMount
}