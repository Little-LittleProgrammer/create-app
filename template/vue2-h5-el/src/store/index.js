import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import user from './modules/user';
import antd from './modules/antd';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        global,
        user,
        antd
    }
});
