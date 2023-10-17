<template>
    <div id="app">
        <router-view v-if="$store.state.global.menuDataLoadingEnd"></router-view>

        <!-- 异步导出文件提示窗 -->
        <el-dialog :visible.sync="$store.state.global.asyncExportNoticePop.visible" center class="qm-confirm-pop w500" :modal-append-to-body="false" :show-close="false">
            <div class="async-download-tips">
                <span class="s-tit">文件名：<em>{{$store.state.global.asyncExportNoticePop.file}}</em></span>
            </div>
            <span v-if="$store.state.global.asyncExportNoticePop.title && $store.state.global.asyncExportNoticePop.title != ''" v-html="$store.state.global.asyncExportNoticePop.title"></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$store.commit('SET_ASYNC_POP_STATUS', false)">确定</el-button>
                <el-button type="primary" @click="go_export()">导出管理</el-button>
            </span>
        </el-dialog>
        <!-- 异步导出文件提示窗 -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    components: {
        
    },
    computed: {
    },
    created() {
    },
    methods: {
        go_export() {
            this.$store.commit('SET_ASYNC_POP_STATUS', false);
            window.open(this.$store.state.global.asyncExportNoticePop.file, '_blank');
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
