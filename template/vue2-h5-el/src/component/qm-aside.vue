<template>
    <aside class="qm-aside" :class="{'qm-aside-hide': !isShow}">
        <p class="qm-aside-top">
            <span class="qm-aside-top-title">{{ environmentData.title }}</span>
        </p>
        <div class="qm-aside-tabs" ref="ref-aside-menu">
            <dl class="tabs" v-for="(item,index) in menuData" :key="index">
                <dt v-if="item.child" class="point">
                    <i class="iconfont i-icon" :class="item.iconClassname" v-if="false"></i>{{ item.name }}
                    <i class="iconfont i-arrow el-icon-arrow-down"></i>
                </dt>
                <dt v-else @click.stop="jump_page(item, $event)" class="link" :class="{ 'cur' : $route.path.includes(item.url)}">
                    <a :href="item.url">{{ item.name }}</a>
                </dt>
                <dd v-if="item.child">
                    <ul class="item">
                        <li v-for="(link,idx) in item.child" :key="idx" :class="{ 'cur' : $route.path.includes(link.url)}" @click.stop="jump_page(link, $event)">
                            <a :href="link.url" @click.stop="jump_page(link, $event)" >{{ link.name}}</a>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>

        <div class="qm-aside-arrow-btn" @click="show_hide_aside"></div>
    </aside>
</template>
<script>

    export default {
        props: {
            menuData: {
                type: Array,
                required: true,
                default: () => {
                    return [];
                }
            },
            environmentData: {
                type: Object,
                default: () => {
                    return {
                        title: ''
                    };
                }
            }
        },
        data() {
            return {
                isShow: true,
            }
        },
        watch: {
            'menuData'(val){
                setTimeout(() => {
                    const $refAsideMenu = this.$refs['ref-aside-menu'];
                    const _height = $refAsideMenu.offsetHeight;
                    const $selectedMenu = $refAsideMenu.querySelectorAll('.cur');
                    
                    if ($selectedMenu.length > 0){
                        const _topNum = $selectedMenu[0].offsetTop;
                        const _scrollTopNum = $refAsideMenu.scrollTop;
                        if (_topNum >= _height + _scrollTopNum){
                            $refAsideMenu.scrollTo(0, _topNum - 150);
                        }
                    }
                }, 500);
            }
        },
        components: {

        },
        mounted() {
            
        },
        methods: {
            show_hide_aside() {
                this.isShow = !this.isShow
            },
            jump_page(item, event) {
                // 阻止href跳转
                if (!(item.url.includes('http://') || item.url.includes('https://') || item.url.match(/^\/\//) != null)){
                    event.preventDefault();
                    this.$router.push({
                        path: item.url
                    });
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .qm-aside {
        position: relative;
        z-index: $aside-index;
        width: 200px;
        display: block;
        background: $aside-bg;
        /*overflow: hidden;*/
        /*transition: all 0.3s linear;*/
        &-top {
            height: 60px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 4px 0;
            &-title {
                line-height: 26px;
                display: block;
                text-align: center;
                font-size: 20px;
                color: $environment-color;
            }
        }
        &-arrow-btn {
            z-index: 1;
            right: -10px;
            width: 100px;
            height: 100px;
            border-radius: 20px;
            background: #fff;
            cursor: pointer;
            position: absolute;
            transform: translate(0, -50%);
            top: 50%;
            &:before {
                content: '';
                right: 5px;
                border-top: 4px solid transparent;
                border-right: 4px solid #bbb;
                border-bottom: 4px solid transparent;
                width: 0;
                height: 0;
                position: absolute;
                top: 50%;
                /*transition: transform 0.3s linear;*/
            }
            &:hover {
                &:before {
                    border-right: 4px solid #333;
                }
            }
        }
        &-tabs {
            position: relative;
            z-index: 10;
            overflow: hidden;
            overflow-y: auto;
            height: calc(100% - 60px);
            .tabs {
                line-height: 36px;
                border-bottom: 1px solid #eee;
                &:last-child {
                    border-bottom: 0 none;
                }
                dt {
                    padding-left: $space;
                    line-height: 36px;
                    position: relative;
                    .iconfont {
                        position: absolute;
                        top: 0;
                        height: 100%;
                        line-height: 36px;
                        width: 30px;
                        text-align: center;
                        &.i-icon {
                            left: 0;
                        }
                        &.i-arrow {
                            right: 0;
                        }
                    }

                    &.point {
                        cursor: pointer;
                    }
                    &.link {
                        cursor: pointer;
                        &:hover {
                            background: rgba(204, 204, 204, 0.2);
                        }
                        a {
                            color: #000;
                            line-height: 36px;
                        }
                    }
                    &.cur {
                        background: $important-color;
                        a {
                            line-height: 36px;
                            color: #fff;
                        }
                        &:hover {
                            background: $important-color;
                        }
                    }
                }
                .item {
                    padding-bottom: 10px;
                    & > li {
                        padding-left: $space * 2;
                        font-size: 14px;
                        cursor: pointer;
                        a {
                            color: $second-color;
                            display: block;
                        }
                        &:hover {
                            background: rgba(204, 204, 204, 0.2);
                        }
                        &.cur {
                            background: $important-color;
                            a {
                                color: #fff;
                            }
                            &:hover{
                                background: $important-color;
                            }
                        }
                    }
                }
            }
        }

        &.narrow {
            width: 150px;
            font-size: 14px;
            .qm-aside-tabs {
                dt {
                    line-height: 30px;
                    .iconfont {
                        line-height: 30px;
                    }
                }
                dd {
                    li {
                        line-height: 30px;
                    }
                    .item li {
                        font-size: 12px;
                    }
                }

            }
        }

        &-hide {
            width: 0 !important;
            .qm-aside-top {
                display: none;
            }
            .qm-aside-title {
                display: none;
            }
            .qm-aside-tabs {
                display: none;
            }
            &-arrow-btn {
                &:before {
                    transform: rotateZ(180deg) translate(-50%, -50%);
                }
            }
        }
    }
</style>
