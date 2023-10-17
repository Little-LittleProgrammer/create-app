<template>
    <div>
        <div>
            <div class="row">
                
                <el-form :inline="true" size="mini" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="add_person">添加人员</el-button>
                    </el-form-item>
                </el-form>
                
                <el-table size="mini" ref="tableData" v-loading="$store.state.global.dataLoading" height="calc(100vh - 122px)" stripe :data="tableDataList" border>
                    <el-table-column :label="value" :prop="key" v-for="(value, key) in tableHeader" :key="key" :width="set_table_column_width(key)"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right" width="200">
                        <template slot-scope="scope">
                            <p class="p-btn-list">
                                <a href="javascript:void(0);" @click="set_association_person(scope.row)">设置关联人员</a>
                                <a href="javascript:void(0);" @click="edit_person(scope.row)">修改</a>
                                <a href="javascript:void(0);" @click="delete_person(scope.row, scope.$index)">删除</a>
                            </p>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>

        <div>
            <!-- 确认删除弹窗 -->
            <el-dialog :visible.sync="confirmPop.visible" center class="qm-confirm-pop w500" :modal-append-to-body="false" :show-close="false" top="0">
                <i class="el-icon-close close-pop-btn" @click="confirmPop.visible = false"></i>
                <span class="s-tit">确认删除{{confirmPop.data.username}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delete_person_submit">确认</el-button>
                    <el-button type="primary" @click="confirmPop.visible = false;">取消</el-button>
                </span>
            </el-dialog>
            <!-- 确认删除弹窗 -->

            <!-- 添加修改人员弹窗 -->
            <el-dialog :visible.sync="addAndEditPersonPop.visible" center class="qm-confirm-pop w500" :modal-append-to-body="false" :show-close="false" top="0">
                <i class="el-icon-close close-pop-btn" @click="addAndEditPersonPop.visible = false"></i>
                <span class="s-tit">{{ addAndEditPersonPop.type == 'add' ? '添加人员' : '修改' + addAndEditPersonPop.data.username }}</span>
                <ul class="data-list pr100">
                    <li>
                        <span class="s-tit right">人员姓名：</span>
                        <div class="txt">
                            <el-input v-model="addAndEditPersonPop.data.username" size="mini"></el-input>
                        </div>
                    </li>
                    <li>
                        <span class="s-tit right">权限设置：</span>
                        <div class="txt">
                            <el-select v-model="addAndEditPersonPop.data.rid" placeholder="请选择" size="mini">
                                <el-option v-for="option in rolesOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="save_person_submit">保存</el-button>
                </span>
            </el-dialog>
            <!-- 添加修改人员弹窗 -->

            <!-- 设置关联人员弹窗 -->
            <el-dialog :visible.sync="setAssociationPersonPop.visible" center class="qm-confirm-pop w800" :modal-append-to-body="false" :show-close="false" top="0">
                <i class="el-icon-close close-pop-btn" @click="setAssociationPersonPop.visible = false"></i>
                <span class="s-tit">设置关联人员</span>
                <div class="association-person-box">
                    <p class="p-name">人员姓名：{{ setAssociationPersonPop.selectedPerson.username }}</p>
                    <p class="p-association-list">
                        <el-checkbox-group class="btn-style" v-model="setAssociationPersonPop.useIds" size="small">
                            <el-checkbox-button :label="item.id" v-for="(item,index) in tableDataList" :key="index" v-if="item.id != setAssociationPersonPop.selectedPerson.id">{{ item.username }}</el-checkbox-button>
                        </el-checkbox-group>
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="save_association_person_submit">保存</el-button>
                </span>
            </el-dialog>
            <!-- 设置关联人员弹窗 -->
        </div>
    </div>
</template>
<script>
    import { deep_copy } from '@/assets/js/tools';
    import { api_user_list, api_user_options, api_user_add, api_user_del, api_user_edit, api_user_setrelate } from '@/http/system-management/permission/person';

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
                addAndEditPersonPop: {
                    visible: false,
                    data: {
                        username: '',
                        rid: '',
                        id: '',
                    },
                    type: '',
                },
                setAssociationPersonPop: {
                    visible: false,
                    useIds: [],
                    selectedPerson: '',
                },
                
                defaultData: {
                    id: '',
                    rid: '',
                    username: '',
                },
                rolesOptions: [],
            }
        },
        mounted() {
            this.get_user_options();
            this.init_data();
        },
        computed: {
            
        },
        components: {
            
        },
        methods: {
            set_table_column_width(key){
                if(key == 'relation_user_t'){
                    return '';
                }else if(key == 'last_ip' || key == 'last_time'){
                    return '150';
                }else{
                    return '150';
                }
            },
            get_user_options(){
                api_user_options().then( res => {
                    if(res.code == 200){
                        this.rolesOptions = res.data.roleOptions;
                    }
                })
            },
            init_data(){
                this.$store.commit('SET_DATA_LOADING_STATUS', true);
                api_user_list().then( res => {
                    if(res.code == 200){
                        this.tableDataList = res.data.list;
                        this.tableHeader = res.data.head;
                    }
                    this.$store.commit('SET_DATA_LOADING_STATUS', false);
                })
            },
            set_association_person(data){       //  设置关联人员
                this.setAssociationPersonPop.selectedPerson = data;
                if(data.relation_user != ''){
                    this.setAssociationPersonPop.useIds = data.relation_user.split(',');
                }else{
                    this.setAssociationPersonPop.useIds = [];
                }
                this.setAssociationPersonPop.visible = true;
            },
            add_person(){
                this.addAndEditPersonPop.type = 'add';
                this.addAndEditPersonPop.data = qmTools.deepCopy(this.defaultData);
                this.addAndEditPersonPop.visible = true;
            },
            edit_person(data){
                this.addAndEditPersonPop.type = 'edit';
                this.addAndEditPersonPop.data = data;
                this.addAndEditPersonPop.visible = true;
            },
            delete_person(data,index){
                this.confirmPop.data = data;
                this.confirmPop.index = index;
                this.confirmPop.visible = true;
            },
            delete_person_submit(){
                api_user_del({
                    id: this.confirmPop.data.id,
                }).then( res => {
                    if(res.code == 200){
                        this.tableDataList.splice(this.confirmPop.index,1);
                        this.$message.success('人员删除成功');
                    }
                    this.confirmPop.visible = false;
                }).catch( err => {
                    this.confirmPop.visible = false;
                })
            },
            save_person_submit(){
                if(this.addAndEditPersonPop.data.username.trim() == ''){
                    this.$message.error('必须填写人员姓名');
                    return false;
                }
                if(this.addAndEditPersonPop.data.rid == ''){
                    this.$message.error('必须设置权限');
                    return false;
                }
                if(this.addAndEditPersonPop.type == 'edit'){
                    api_user_edit({
                        rid: this.addAndEditPersonPop.data.rid,
                        username: this.addAndEditPersonPop.data.username,
                        id: this.addAndEditPersonPop.data.id,
                    }).then( res => {
                        if(res.code == 200){
                            this.$message.success('人员修改成功');
                        }
                        this.addAndEditPersonPop.visible = false;
                        this.init_data();
                    })
                }else if(this.addAndEditPersonPop.type == 'add'){
                    api_user_add({
                        rid: this.addAndEditPersonPop.data.rid,
                        username: this.addAndEditPersonPop.data.username,
                    }).then( res => {
                        if(res.code == 200){
                            this.$message.success('人员添加成功');
                            this.addAndEditPersonPop.data.id = res.data.id;
                        }
                        this.addAndEditPersonPop.visible = false;
                        this.init_data();
                    })
                }
            },
            save_association_person_submit(){
                let _formUserIds = '';
                if(this.setAssociationPersonPop.useIds.length > 0){
                    _formUserIds = this.setAssociationPersonPop.useIds.join(',')
                }else{
                    _formUserIds = '';
                }

                api_user_setrelate({
                    id: this.setAssociationPersonPop.selectedPerson.id,
                    useIds: _formUserIds,
                }).then( res => {
                    if(res.code == 200){
                        let _userNameArr = [], _userIdArr = [];
                        this.setAssociationPersonPop.selectedPerson.relation_user_t = '';
                        this.setAssociationPersonPop.selectedPerson.relation_user = '';
                        
                        this.tableDataList.forEach( (n,i) => {
                            if(this.setAssociationPersonPop.useIds.includes(n.id)){
                                _userNameArr.push(n.username);
                                _userIdArr.push(n.id);
                            }
                        })
                        this.setAssociationPersonPop.selectedPerson.relation_user_t = _userNameArr.join(',');
                        this.setAssociationPersonPop.selectedPerson.relation_user = _userIdArr.join(',');
                        this.$message.success('关联人员设置成功');
                    }
                    this.setAssociationPersonPop.visible = false;
                }).catch( err => {
                    this.setAssociationPersonPop.visible = false;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
