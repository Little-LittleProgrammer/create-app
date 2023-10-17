import { Message } from 'element-ui'

const state = {
    date: '', //  服务器时间
    dataLoading: true, //  数据加载
    pageLoading: false, //  页面加载
    environmentData: { //  环境
        env: '', // 0:测试环境 1:正式环境
        title: ''
    },
    menuDataLoadingEnd: false, // 加载导航数据
    asyncExportNoticePop: { //  下载
        visible: false,
        file: '',
        title: ''
    }
};

const getters = {
};

const mutations = {
    SET_DATA_LOADING_STATUS(state, data) { //  设置数据loading
        state.dataLoading = data;
    },
    SET_PAGE_LOADING_STATUS(state, data) { //  设置页面loading
        state.pageLoading = data;
    },
    SET_DATE(state, data){ //  设置服务器时间
        state.date = new Date(data);
    },
    SET_ENVIRONMENT_DATA(state, data){ //  环境检测
        state.environmentData.env = data.env;
        if (data.env == '0'){
            state.environmentData.title = '测试环境';
        } else if (data.env == '1'){
            state.environmentData.title = '正式环境';
        }
    },
    SET_MENU_LOADING_END_STATUS(state, data) { //  设置导航菜单数据加载状态
        state.menuDataLoadingEnd = data;
    },
    SET_ASYNC_EXPORT_DATA(state, data) { //  设置导出功能数据
        if (data.action == 'async') {
            if (data.title) {
                state.asyncExportNoticePop.title = data.title;
            }
            state.asyncExportNoticePop.file = data.message;
            state.asyncExportNoticePop.visible = true;
        } else if (data.action == 'sync') {
            window.open(data.url, '_blank');
            Message.success({
                title: '导出成功',
                type: 'success'
            });
        }
    },
    SET_ASYNC_POP_STATUS(state, data){ //  设置导出弹框关闭
        state.asyncExportNoticePop.visible = data;
    }
};

const actions = {
};

export default {
    state,
    getters,
    actions,
    mutations
};
