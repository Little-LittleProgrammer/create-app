<template>
    <article class="qm-error error-no-data">
        <span class="s-tips" v-html="title"></span>
    </article>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '暂无数据'
            },
        },
        data() {
            return {
                
            }
        },
        watch: {

        },
        mounted() {
            
        },
        computed: {},
        components: {},
        methods: {

        }
    } 
</script>

<style lang="scss" scoped >
    .qm-error{
        padding: 100px 0;
        text-align: center;
        .s-tips{
            display: block;
            font-size: 14px;
            color: $third-color;
        }
    }

</style>