import Vue from 'vue';
import VueRouter from 'vue-router';
import routerData from '@/router/modules/router'; //  内容路由
import routerErrorData from '@/router/modules/error'; //  错误路由
import mainMenu from '@/menus/index'; //  导航数据
import { api_user_menus } from '@/http/user';
import { api_global_env } from '@/http/global';
import store from '@/store';
// import { generateRoutes } from '@/assets/js/permission';
Vue.use(VueRouter);
const get_menus = asyncRoutes => {
    api_user_menus().then(res => {
        store.commit('SET_MAIN_NAVS', res.data.list);
        store.commit('SET_INIT_MENU', res.data.init_menu);
        store.commit('SET_MENU_LOADING_END_STATUS', true);
        // const _user_routes = generateRoutes(res.data.list, asyncRoutes);
        // router.addRoutes(_user_routes);
        if (!window.location.href.includes('/admin/')){
            if (res.data.init_menu == ''){
                router.app.$router.replace({
                    path: '/admin'
                });
            } else {
                router.app.$router.replace({
                    path: res.data.init_menu
                });
            }
        }
    });
};
const routes = [
    // {
    //     path: '/',
    //     redirect: '/admin'
    // },
    {
        path: '/admin',
        redirect: '/admin/base-data'
    }
].concat(routerData).concat(routerErrorData);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// 开启权限动态路由
const _openAuthority = true; //  开启权限
if (_openAuthority){
    get_menus();
} else {
    store.commit('SET_MAIN_NAVS', mainMenu);
    store.commit('SET_MENU_LOADING_END_STATUS', true);
}

const _openEnv = true; //  开启环境检测
if (_openEnv){
    api_global_env().then(res => {
        store.commit('SET_ENVIRONMENT_DATA', res.data);
    });
    setTimeout(() => {
        api_global_env().then(res => {
            store.commit('SET_ENVIRONMENT_DATA', res.data);
        });
    }, 3 * 60 * 1000);
}

export default router;
