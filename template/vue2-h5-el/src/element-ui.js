import Vue from 'vue';
import {
    Radio, // 单选框
    Checkbox, // 多选框
    Select, // 选择器
    Input, // 输入框
    Button, // 按钮
    Table, // 表格
    Tabs, // 标签页
    Tag, // 标签
} from 'element-ui';

Vue.use(Radio); // 单选框
Vue.use(Checkbox); // 多选框
Vue.use(Select); // 选择器
Vue.use(Input); // 输入框
Vue.use(Button); // 按钮
Vue.use(Table); // 表格
Vue.use(Tabs); // 标签页
Vue.use(Tag); // 标签

Vue.prototype.$elMessage = Message; //  提示
