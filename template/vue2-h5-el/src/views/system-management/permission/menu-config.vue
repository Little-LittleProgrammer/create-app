<template>
    <div>
        <div>
            <div class="row">
                <el-form :inline="true" size="mini" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="add_first_level_menu">添加一级菜单</el-button>
                    </el-form-item>
                </el-form>

                <div class="qm-premission-tree-table">
                    <div class="qm-premission-tree-table-th">
                        <span class="s-name">菜单名称</span>
                        <span class="s-url">页面地址</span>
                        <span class="s-project">页面项目</span>
                        <span class="s-fun">操作</span>
                    </div>
                </div>

                <el-tree :data="tableDataList" ref="tree" v-loading="$store.state.global.dataLoading" :props="defaultProps" node-key="id" :default-expanded-keys="expandedKeys" :expand-on-click-node="false" class="qm-premission-tree-table" draggable @node-drop="handle_drop" :allow-drop="allow_drop" :allow-drag="allow_drag">
                    <div class="qm-premission-tree-table-tb" slot-scope="{ node, data }">
                        <template v-if="data.edit && data.edit == 1">
                            <span class="s-name"><el-input v-model="data.name" :ref="'input_' + data.id" size="mini" placeholder="请输入菜单名称"></el-input></span>
                            <span class="s-url"><el-input v-model="data.url" size="mini" placeholder="请输入页面地址"></el-input></span>
                            <span class="s-project">
                                <el-select v-if="data.is_menu != '1'" v-model="formData.project" multiple collapse-tags placeholder="请选择项目" size="mini" class="el-select-auto">
                                    <el-option v-for="option in projectOptions" :key="option.value" :label="option.label" :value="option.value" size="mini"></el-option>
                                </el-select>
                            </span>
                        </template>
                        <template v-else>
                            <span class="s-name" :title="data.name">{{ data.name }} <em v-if="data.is_menu == 0">(接口)</em></span>
                            <span class="s-url" :title="data.url">{{ data.url }}</span>
                            <span class="s-project" :title="data.project">
                                <template v-for="(project,index) in data.project.split(',')" >
                                    <template v-for="option in projectOptions" v-if="project == option.value">
                                        {{ index == data.project.split(',').length - 1 ? option.label : (option.label + ',')}}
                                    </template>
                                </template>
                            </span>
                        </template>
                        
                        <span class="s-fun">
                            <template v-if="data.edit && data.edit == 1">
                                <el-button type="text" size="mini" @click="() => save_menu(node, data)">保存</el-button>
                                <template v-if="data.id.includes('default-')">
                                    <el-button type="text" size="mini" @click="() => delete_menu(node, data)">删除</el-button>
                                </template>
                                <template v-else>
                                    <el-button type="text" size="mini" @click="() => cancel_menu(node, data)">取消</el-button>
                                </template>
                            </template>
                            <template v-else>
                                <template v-if="data.is_menu == '1'">
                                    <el-button type="text" size="mini" @click="() => add_submenu(node, data)">添加子菜单</el-button>
                                    <el-button type="text" size="mini" @click="() => add_interface(node, data)">添加接口</el-button>
                                </template>
                                <el-button type="text" size="mini" @click="() => edit_menu(node, data)">修改</el-button>
                                <el-button type="text" size="mini" @click="() => delete_menu(node, data)">删除</el-button>
                            </template>
                        </span>
                    </div>
                </el-tree>

            </div>
        </div>

        <div>
            <!-- 确认删除弹窗 -->
            <el-dialog :visible.sync="deleteConfirmPop.visible" center class="qm-confirm-pop w500" :modal-append-to-body="false" :show-close="false" top="0">
                <i class="el-icon-close close-pop-btn" @click="deleteConfirmPop.visible = false"></i>
                <span class="s-tit">确认删除{{deleteConfirmPop.data.name}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delete_submit">确认</el-button>
                    <el-button type="primary" @click="deleteConfirmPop.visible = false;">取消</el-button>
                </span>
            </el-dialog>
            <!-- 确认删除弹窗 -->
        </div>
    </div>
</template>
<script>
    import { deep_copy } from '@/assets/js/tools';
    import { api_menu_list, api_menu_add, api_menu_del, api_menu_edit, api_menu_sort } from '@/http/system-management/permission/menu-config';

    export default {
        props: {},
        data() {
            return {
                tableDataList: [],
                defaultData: {
                    name: '',
                    url: '',
                    is_menu: '1',       //  菜单就是1  功能接口 0
                    pid: '0',           //  上级菜单id，默认0
                    project: '',        //  项目，默认空，代表不区分项目
                    child: [],
                    edit: 1,
                    id: '',
                },
                defaultProps: {
                    children: 'child',
                    label: 'name',
                },
                deleteConfirmPop:{          //  删除确认弹窗
                    visible: false,
                    data: '',
                    node: '',
                },
                projectOptions:[],
                formData: {
                    project: [],
                },
                tempMenu: '',
                expandedKeys: [],
            }
        },
        mounted() {
            this.init_data();
        },
        computed: {
            
        },
        components: {

        },
        methods: {
            init_data(){
                this.$store.commit('SET_DATA_LOADING_STATUS', true);
                api_menu_list().then( res => {
                    if(res.code == 200){
                        this.tableDataList = res.data.list;
                        this.projectOptions = res.data.peojectOptions;
                    }
                    this.$store.commit('SET_DATA_LOADING_STATUS', false);
                })
            },
            add_first_level_menu(){         //  添加一级菜单
                let _data = deep_copy(this.defaultData);
                _data.id = 'default-' + Date.now();
                this.tableDataList.push(_data);
                this.scroll_to_input(_data);
            },
            add_submenu(node,data){         //  添加子集菜单
                if(data.project != ''){
                    this.formData.project = data.project.split(',');
                }else{
                    this.formData.project = [];
                }
                let _data = deep_copy(this.defaultData);
                _data.id = 'default-' + Date.now();
                _data.pid = data.id;
                if(!data.child){
                    this.$set(data,'child',[_data]);
                }else{
                    data.child.push(_data);
                }
                this.scroll_to_input(_data);
                this.expandedKeys[0] = _data.id;
            },
            add_interface(node,data){
                if(data.project != ''){
                    this.formData.project = data.project.split(',');
                }else{
                    this.formData.project = [];
                }
                let _data = deep_copy(this.defaultData);
                _data.id = 'default-' + Date.now();
                _data.pid = data.id;
                _data.is_menu = '0';
                if(!data.child){
                    this.$set(data,'child',[_data]);
                }else{
                    data.child.push(_data);
                }
                this.scroll_to_input(_data);
                this.expandedKeys[0] = _data.id;
            },
            edit_menu(node,data){           //  编辑菜单
                if(data.project != ''){
                    this.formData.project = data.project.split(',');
                }else{
                    this.formData.project = [];
                }
                this.tempMenu = deep_copy(data);
                this.$set(data,'edit',1);
            },
            cancel_menu(node,data){         //  取消编辑菜单
                data.edit = 0;
                data.name = this.tempMenu.name;
                data.url = this.tempMenu.url;
                data.project = this.tempMenu.project;
            },
            delete_menu(node,data){         //  删除菜单
                this.deleteConfirmPop.data = data;
                this.deleteConfirmPop.node = node;
                this.deleteConfirmPop.visible = true;
            },
            delete_submit(){                //  确认删除菜单
                if(this.deleteConfirmPop.data.id.includes('default-')){
                    this.$refs.tree.remove(this.deleteConfirmPop.node);
                    if(this.deleteConfirmPop.data.is_menu == '0'){
                        this.$message.success('接口删除成功');
                    }else{
                        this.$message.success('菜单删除成功');
                    }
                    this.deleteConfirmPop.visible = false;
                }else{
                    api_menu_del({ 'id': this.deleteConfirmPop.data.id}).then( res => {
                        if(res.code == 200){
                            if(this.deleteConfirmPop.data.is_menu == '0'){
                                this.$message.success('接口删除成功');
                            }else{
                                this.$message.success('菜单删除成功');
                            }
                            this.$refs.tree.remove(this.deleteConfirmPop.node);
                        }
                        this.deleteConfirmPop.visible = false;
                    }).catch( err => {
                        this.deleteConfirmPop.visible = false;
                    })
                }
            },
            save_menu(node,data){           //  保存菜单
                if(data.name.trim() == ''){
                    this.$message.error('标题不能为空');
                    return false;
                }
                if(data.url.trim() == ''){
                    this.$message.error('url地址不能为空');
                    return false;
                }

                data.edit = 0;
                let _data = deep_copy(data);
                delete _data.edit;
                if(this.formData.project.length > 0){
                    _data.project = this.formData.project.join(',');
                }else{
                    _data.project = '';
                }
                if(data.id.includes('default-')){
                    delete _data.id;
                    api_menu_add(_data).then( res => {
                        if(res.code == 200){
                            data.name = res.data.name;
                            data.url = res.data.url;
                            data.project = res.data.project;
                            data.id = res.data.id;
                            data.pid = res.data.pid;
                            if(_data.is_menu == '0'){
                                this.$message.success('接口新增成功');
                            }else{
                                this.$message.success('菜单新增成功');
                            }
                        }else{
                            this.$refs.tree.remove(data);
                        }
                    })
                }else{
                    api_menu_edit(_data).then( res => {
                        if(res.code == 200){
                            data.name = res.data.name;
                            data.url = res.data.url;
                            data.project = res.data.project;
                            if(_data.is_menu == '0'){
                                this.$message.success('接口修改成功');
                            }else{
                                this.$message.success('菜单修改成功');
                            }
                        }else{
                            this.$refs.tree.remove(data);
                        }
                    })
                }
            },
            scroll_to_input(data){
                setTimeout( () => {
                    let $input = this.$refs['input_'+data.id].$el;
                    if($input.offsetTop > (document.querySelectorAll('.js-layout-main')[0].scrollTop + document.documentElement.clientHeight - 100)){
                        document.querySelectorAll('.js-layout-main')[0].scrollTo(0, $input.offsetTop - 300);
                    }
                    this.$refs['input_'+data.id].focus();
                }, 50)
            },

            handle_drop(draggingNode, dropNode, dropType, ev) {
                let _ids = [], _pid = '';
                if(dropType == 'inner'){
                    _pid = dropNode.data.id;
                    dropNode.data.child.forEach( (n,i) => {
                        _ids.push(n.id);
                    })
                }else{
                    if(dropNode.parent.data.id){
                        _pid = dropNode.parent.data.id;
                        dropNode.parent.data.child.forEach( (n,i) => {
                            _ids.push(n.id);
                        })
                    }else{
                        _pid = 0;
                        dropNode.parent.data.forEach( (n,i) => {
                            _ids.push(n.id);
                        })
                    }
                }
                if(_ids.length > 0){
                    _ids = _ids.join(',');
                }else{
                    _ids = '';
                }
                api_menu_sort({
                    ids: _ids,
                    pid: _pid,
                }).then( res => {
                    if(res.code == 200){
                        this.$message.success('顺序调整成功');
                    }
                })
            },
            allow_drag(node){
                if(node.data.edit && node.data.edit == 1){
                    return false;
                }else{
                    return true;
                }
            },
            allow_drop(draggingNode,dropNode,type){
                // console.log(draggingNode);
                // console.log(dropNode);
                // if(draggingNode.data.edit == 1){
                //     return false;
                // }
                if(draggingNode.data.edit && draggingNode.data.edit == 1){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>

