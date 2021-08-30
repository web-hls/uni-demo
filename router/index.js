// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import store from '../store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log(to)
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
})

export {
	router,
	RouterMount
}