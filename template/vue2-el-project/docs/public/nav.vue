<template>
    <ul>
        <li
        v-for="item in navArray"
        :key="item.value"
        v-show="item.searchKeyword.includes(search)"
        @click.stop="select(item, true)">
            <div class="menu-item" :class="{'menu-item-choose': item.component == activeKey}">
                <span class="arrow" :class="{'arrow-none': !item.children || item.children.length == 0, 'arrow-fold': !item.unfold}" :style="{'margin-left': `${15 * (item.level-1)}px`}"></span>
                <span>{{item.label}}</span>
            </div>
            <transition name="el-zoom-in-top">
                <NavSide :search="search" :activeKey="activeKey" :navArray="item.children || []" v-if="item.children && item.children.length > 0 && item.unfold"></NavSide>
            </transition>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'NavSide',
    props: {
        navArray: {
            type: Array,
            default: () => {}
        },
        activeKey: {
            type: String,
            default: ''
        },
        search: {
            type: String,
            default: ''
        }
    },
    methods: {
        select(obj){
            if (obj.type == 'folder') {
                obj.unfold = !obj.unfold;
                return;
            }
            if (!obj.component) return;
            this.$bus.$emit('setKey', obj.component);
            this.query_to_bind_url({type: obj.component});
            const _el = document.querySelector('.md-content');
            _el.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        // 搜索query处理
        query_to_bind_url(data){
            const _queryData = data;
            const _querysArr = [];
            for (const i in _queryData) {
                _querysArr.push(i + '=' + _queryData[i]);
            }
            const _querysStr = _querysArr.join('&');
            window.history.replaceState(null, null, '?' + _querysStr);
        }
    }
};
</script>
<style lang="scss" scoped>
.menu-item {
    padding: 10px 15px;
    margin-top: 10px;
    cursor: pointer;
    transition: all .3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        border: 3px solid #ccc;
        border-left-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(90deg);
        margin-right: 8px;
        margin-bottom: 2px;
        transition: all .3s;
    }
    .arrow-none {
        border-top-color: transparent!important;
        border-right-color: transparent!important;
    }
    .arrow-fold {
        transform: rotate(45deg);
    }
    &:hover {
        color: $primary-color;
        .arrow {
            border-top-color: $primary-color;
            border-right-color: $primary-color;
        }
    }
    &-choose {
        color: $primary-color;
        border-right: 2px solid $primary-color;
    }
}
</style>
