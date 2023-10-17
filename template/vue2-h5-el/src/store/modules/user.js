const state = {
    mainNavs: [],
    asideNavs: [],
    initMenu: '/' //  默认地址
};

const getters = {
};

const mutations = {
    SET_MAIN_NAVS(state, data) {
        state.mainNavs = data;
    },
    SET_ASIDE_NAVS(state, data) {
        state.asideNavs = data;
    },
    SET_INIT_MENU(state, data) {
        state.initMenu = data;
    }
};

const actions = {};

export default {
    state,
    getters,
    actions,
    mutations
};
