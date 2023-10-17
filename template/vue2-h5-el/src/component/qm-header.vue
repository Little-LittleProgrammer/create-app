<template>
    <header class="qm-header">

        <a :href="initMenu != '' ? initMenu : 'javascript:void(0)'" class="qm-header-logo"><img src="@/assets/images/logo.png" alt=""></a>

        <div class="qm-header-tabs">
            <div class="qm-scroll">
                <qm-scroll ref="headerScroll" :scrollX="true" :scrollY="false" :data="menuData">
                    <div class="qm-scroll-con-x">
                        <ul>
                            <li v-for="(item,index) in menuData" :key="index" :class="{ 'cur' : $route.path.includes(item.url)}">
                                <a :href="item.url" @click.stop="jump_page(item, $event)"  >{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </qm-scroll>
            </div>
        </div>

    </header>
</template>
<script>

    import qmScroll from '@/component/qm-scroll';

    export default {
        props: {
            menuData: {
                type: Array,
                required: true,
                default: () => {
                    return [];
                }
            },
            initMenu: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed:{
            
        },
        mounted() {
            let resizeTimeId;
            window.onresize = () => {
                clearTimeout(resizeTimeId);
                resizeTimeId = setTimeout(() => {
                    this.$refs.headerScroll.refresh();
                }, 100);
            }
            this.init_data();
            this.refresh();
        },
        watch: {
            // 'menu'(){
            //     this.menu.forEach( (n,i) => {
            //         if(this.$route.path.includes(n.url)){
            //             this.select_menu(n);
            //         }
            //     })
            // }
        },
        components: {
            qmScroll
        },
        methods: {
            // 选择父导航，筛选除对应左侧菜单
            jump_page(item, event) {
                if (item.child != undefined) {
                    this.$store.commit('SET_ASIDE_NAVS', item.child);
                }
                if (!(item.url.includes('http://') || item.url.includes('https://') || item.url.match(/^\/\//) != null)){
                    event.preventDefault();
                    if(item.child[0].child != undefined && item.child[0].child.length > 0){
                        this.$router.push({
                            path: item.child[0].child[0].url
                        });
                    }else{
                        this.$router.push({
                            path: item.child[0].url
                        });
                    }
                }
            },
            init_data(){
                const _routePath = this.$route.path;
                const _selectedKey = [];
                this.menuData.some((n, i) => {
                    if (_routePath.includes(n.url)){
                        this.$store.commit('SET_ASIDE_NAVS', n.child);
                        return true;
                    }
                });
            },
            refresh(){
                this.$nextTick(() => {
                    this.$refs.headerScroll.refresh();
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .qm-header {
        height: $header-height;
        color: #fff;
        background-color: $header-bg;
        display: flex;
        padding: 0 $space;
        box-sizing: border-box;
        min-width: $min-width;
        position: relative;
        z-index: $header-index;
        &-logo {
            display: block;
            height: 100%;
            padding: $space $space $space 0;
            box-sizing: border-box;
            img {
                height: 100%;
                display: block;
                vertical-align: top;
            }
        }
        &-tabs {
            flex: 1;
            width: 1px;
            line-height: $header-height;
            display: block;
            ul {
                float: left;
            }
            li {
                float: left;
                a {
                    display: inline-block;
                    padding: 0 $space;
                    line-height: $header-height;
                    color: $header-tabs-color;
                }
                &:hover, &.cur {
                    background: $header-tabs-cur-bg;
                    color: $header-tabs-cur-color;
                }
            }
        }

    }

</style>
