// router.js
import { RouterMount,createRouter } from 'uni-simple-router';
import store from '../store/index.js'
import cookies from 'vue-cookie'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 判断是vuex是否有token，没有就去cookies取并赋值userData
    if(!store.state.token) {
       if(cookies.get('token')) {
           store.commit('REMER_TOKEN', cookies.get('token'))
           store.commit('REMER_USER', JSON.parse(cookies.get('userData')))
           if(to.name == 'login' || to.name == 'register') {
            next({
                name: "my",
                NAVTYPE: 'push'
            });
           }
           next();
       }
    }
    if (to.name != 'login' && to.name != 'register' && !store.state.token) {
        next({
            name: "login",
            params: {
                msg: '未登录请登录',
            },
            NAVTYPE: 'push'
        });
    } else{
    next();
  }
});
// 全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log('跳转结束')
// })

export {
	router,
	RouterMount
}