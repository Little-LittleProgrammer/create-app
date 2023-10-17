import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementUi from 'element-ui';
import Moment from 'moment';
import '@/assets/style/global.scss';

Vue.use(ElementUi);
Vue.config.productionTip = false;

Vue.prototype.$elMoment = Moment; //  时间格式化

// 修复页面前进后退功能
// if (window.history && window.history.pushState) {
//     window.addEventListener('popstate', function(e) {
//         window.location.reload();
//     }, false);
// }

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    // document.title = to.meta.title
    // next()
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
