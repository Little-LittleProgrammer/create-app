<template>
    <div>
        <qm-header :initMenu="$store.state.user.initMenu" :menuData="$store.state.user.mainNavs"></qm-header>
        <div class="wrapper">
            <qm-aside :menuData="$store.state.user.asideNavs" :environmentData="$store.state.global.environmentData"></qm-aside>
            <div class="main js-layout-main">
                <router-view v-if="routeRefresh"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import qmHeader from '@/component/qm-header';
import qmAside from '@/component/qm-aside';
export default {
    data() {
        return {
            routeRefresh: 1
        };
    },
    watch: {
        '$route'(to, from) {
            if (to.path == from.path){
                this.routeRefresh = 0;
                this.$nextTick(() => {
                    this.routeRefresh = 1;
                });
            }
        }
    },
    components: {
        'qm-header': qmHeader,
        'qm-aside': qmAside
    },
    computed: {
    },
    created() {
    }
};
</script>
<style lang="scss" scoped>

</style>
