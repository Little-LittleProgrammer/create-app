<template>
    <div>

        <div>
            <div class="row" v-if="this.pageType == '' || this.pageType == 'list'">
                <el-form :inline="true" size="mini" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="add_role">添加角色</el-button>
                    </el-form-item>
                </el-form>
                
                <el-table size="mini" ref="tableData" v-loading="$store.state.global.dataLoading" height="calc(100vh - 130px)" v-show="tableDataList.length > 0" stripe :data="tableDataList" border>
                    <el-table-column :label="value" :prop="key" v-for="(value, key) in tableHeader" :key="key" :width="set_table_column_width(key)"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right" width="100">
                        <template slot-scope="scope">
                            <p class="p-btn-list">
                                <a href="javascript:void(0);" @click="edit_role(scope.row)">修改</a>
                                <a href="javascript:void(0);" @click="delete_role(scope.row, scope.$index)">删除</a>
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <div class="row" v-else-if="this.pageType == 'add' || this.pageType == 'edit'">
                <h1 v-if="addEditRoleType == 'add'">添加角色</h1>
                <h1 v-else-if="addEditRoleType == 'edit'">修改</h1>
                <el-form ref="form" :rules="roleRules" :model="roleSelectedData" label-width="120px" size="small">
                    <el-form-item label="角色名称：" prop="name">
                        <el-input v-model="roleSelectedData.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :rules="roleRules" :inline="true" :model="roleSelectedData" label-width="120px" size="small" class="demo-form-inline">
                    <el-form-item label="选择权限：">
                        <div class="tree-limit-height">
                            <el-tree :data="roleTreeData" ref="tree" :default-checked-keys="roleTreeCheckedData" show-checkbox node-key="id" :props="defaultRoleTreeProps" @check="tree_check">
                                <div slot-scope="{ node, data }">
                                    <span :title="data.name">{{ data.name }} <em style="color: red" v-if="data.is_menu == 0">(接口)</em></span>
                                </div>
                            </el-tree>
                        </div>
                    </el-form-item>
                    <el-form-item label="初始页面：" prop="init_menu">
                        <div class="tree-limit-height">
                            <el-tree :data="roleTreeStartData" :default-checked-keys="roleTreeStartCheckedData" show-checkbox node-key="id"  :props="defaultRoleTreeStartProps" ref="startTree"  @check="start_tree_check"></el-tree>
                        </div>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :rules="roleRules" :model="roleSelectedData" label-width="120px" size="small">
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="roleSelectedData.remark" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save_role" >保存</el-button>
                        <el-button @click="cancel_role" >取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div>
            <!-- 确认删除弹窗 -->
            <el-dialog :visible.sync="confirmPop.visible" center class="qm-confirm-pop w500" :modal-append-to-body="false" :show-close="false" top="0">
                <i class="el-icon-close close-pop-btn" @click="confirmPop.visible = false"></i>
                <span class="s-tit">确认删除{{confirmPop.data.name}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delete_role_submit">确认</el-button>
                    <el-button type="primary" @click="confirmPop.visible = false;">取消</el-button>
                </span>
            </el-dialog>
            <!-- 确认删除弹窗 -->
        </div>

    </div>
</template>
<script>
    import { deep_copy } from '@/assets/js/tools';
    import { api_role_list, api_role_add, api_role_del, api_role_edit, api_menu_page } from '@/http/system-management/permission/role';

    export default {
        props: {},
        data() {
            return {
                tableDataList: [],
                tableHeader: {},
                confirmPop: {
                    visible: false,
                    data: '',
                    index: '',
                },
                addEditRoleType: 'add',      //  类型 add添加  edit修改
                roleSelectedData: {         //  选中角色
                    auths: [],
                    init_menu: '',
                    name: '',
                    remark: '',
                    id: '',
                },
                defaultRoleData: {          //  默认角色数据
                    auths: [],
                    init_menu: '',
                    name: '',
                    remark: '',
                    id: '',
                },
                roleRules: {
                    name: [
                        { required: true, message: '角色名称必填', trigger: 'change' }
                    ],
                    init_menu: [
                        { required: true, message: ' ', trigger: 'change' }
                    ],
                },
                roleTreeData: [],
                roleTreeStartData: [],
                roleTreeCheckedData: [],
                roleTreeStartCheckedData: [],
                defaultRoleTreeProps: {
                    children: 'child',
                    label: 'name',
                },
                defaultRoleTreeStartProps: {
                    children: 'child',
                    label: 'name',
                    disabled: (data,node) => {
                        setTimeout( () => {
                            if(data.is_menu == '0'){
                                this.$refs.startTree.remove(data);
                            }
                        }, 100)
                    }
                }, 
                pageType: 'list',            //  网页类型list列表 edit或add编辑或者修改
            }
        },
        mounted() {
            this.init_data();
        },
        computed: {
            
        },
        watch: {
            
        },
        components: {
            
        },
        methods: {
            set_table_column_width(key){
                if(key == 'url' || key == 'remark'){
                    return '';
                }else if( key == 'init_menu_t'){
                    return '250';
                }else if(key == 'name'){
                    return '150';
                }else{
                    return '100';
                }
            },
            get_auth_data(id){
                api_menu_page({
                    id: id,
                }).then( res => {
                    if(res.code == 200){
                        this.roleTreeData  = res.data.list;
                        this.roleTreeStartData = deep_copy(this.roleTreeData);
                    }
                })
            },
            init_data(){
                this.$store.commit('SET_DATA_LOADING_STATUS', true);
                api_role_list().then( res => {
                    if(res.code == 200){
                        this.tableDataList = res.data.list;
                        this.tableHeader = res.data.head;
                        this.roleTreeData  = res.data.auth_list;
                        this.$nextTick( () => {
                            this.$refs.tableData.resizeState.width = this.$refs.tableData.resizeState.width + 1;
                            this.$refs.tableData.resizeListener();
                        })
                    }
                    this.$store.commit('SET_DATA_LOADING_STATUS', false);
                })
            },
            add_role(){
                this.roleTreeCheckedData = [];
                this.roleSelectedData = deep_copy(this.defaultRoleData);
                this.get_auth_data(this.roleSelectedData.id);
                this.pageType = 'add';
            },
            edit_role(data){
                this.roleTreeStartCheckedData = [data.init_menu];
                this.roleTreeCheckedData = data.auths;
                this.roleSelectedData = data;
                this.get_auth_data(this.roleSelectedData.id);
                this.pageType = 'edit';
            },
            save_role(){
                if(this.roleSelectedData.init_menu == ''){
                    this.$message.error('初始页面不能为空');
                    return false;
                }
                if(this.roleSelectedData.name.trim() == ''){
                    this.$message.error('角色名称不能为空');
                    return false;
                }

                let _formData = deep_copy(this.roleSelectedData);
                _formData.auths = [];
                this.$refs.tree.getCheckedNodes(false,true).forEach( (n,i) => {
                    _formData.auths.push(n.id);
                })
                _formData.auths = _formData.auths.join(',');
                _formData.show_auths = this.$refs.tree.getCheckedKeys(true).join(',');
                if(this.roleSelectedData.id && this.roleSelectedData.id != ''){
                    api_role_edit(_formData).then( res => {
                        if(res.code == 200){
                            this.$message.success('角色修改成功');
                            this.init_data();
                        }
                        this.pageType = 'list';
                    }).catch( err => {
                        this.pageType = 'list';
                    })
                }else{
                    api_role_add(_formData).then( res => {
                        if(res.code == 200){
                            this.$message.success('角色添加成功');
                            this.roleSelectedData.id = res.data.id;
                            this.init_data();
                        }
                        this.pageType = 'list';
                    }).catch( err => {
                        this.pageType = 'list';
                    })
                }
            },
            delete_role(data,index){
                this.confirmPop.data = data;
                this.confirmPop.index = index;
                this.confirmPop.visible = true;
            },
            delete_role_submit(){
                api_role_del({
                    id: this.confirmPop.data.id,
                }).then( res => {
                    if(res.code == 200){
                        this.tableDataList.splice(this.confirmPop.index,1);
                        this.$message.success('角色删除成功');
                    }
                    this.confirmPop.visible = false;
                }).catch( err => {
                    this.confirmPop.visible = false;
                })
            },
            cancel_role(){
                this.pageType = 'list';
            },
            tree_check(data,status){
                let _checkArr = '';
                _checkArr = deep_copy(this.$refs.tree.getCheckedNodes(false,true));
                _checkArr.forEach( (n,i) => {
                    this.roleSelectedData.auths.push(n.id);
                })
            },
            start_tree_check(data,status){
                if(data.child && data.child.length > 0){
                    this.$message.error('不能选择父级为初始页');
                    this.$refs.startTree.setCheckedNodes([]);
                }else{
                    let _arr = [];
                    this.$refs.tree.getCheckedNodes(false,true).forEach( (n,i) => {
                        _arr.push(n.id);
                    })
                    if(_arr.includes(data.id)){
                        this.roleSelectedData.init_menu = data.id;
                        this.$refs.startTree.setCheckedNodes([data]);
                    }else{
                        this.$message.error('权限不足，不能设置为初始页');
                        this.$refs.startTree.setCheckedNodes([]);
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    h1{
        line-height: 50px;
        font-size: 24px;
        display: block;
        text-align: center;
        padding-bottom: 10px;
    }

    .tree-limit-height{
        max-height: calc(100vh - 290px);
        overflow: hidden;
        overflow-y: scroll;
        min-width: 360px;
    }

    .el-form--inline{
        .el-form-item{
            padding-right: 30px;
            width: 45%;
            box-sizing: border-box;
            &:last-child{
                padding-right: 0;
            }
        }
    }

</style>