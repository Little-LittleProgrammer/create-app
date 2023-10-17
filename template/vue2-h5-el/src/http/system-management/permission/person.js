import { post, get } from '@/http/request';

// 用户设置-列表
export function api_user_list(data) {
    return get('/manage/user/list', data);
}
// 用户设置-筛选项
export function api_user_options(data) {
    return post('/manage/user/options', data);
}
// 用户设置-保存添加
export function api_user_add(data) {
    return post('/manage/user/add', data);
}
// 用户设置-删除
export function api_user_del(data) {
    return post('/manage/user/del', data);
}
// 用户设置-人员编辑
export function api_user_edit(data) {
    return post('/manage/user/edit', data);
}
// 用户设置-人员关联
export function api_user_setrelate(data) {
    return post('/manage/user/setrelate', data);
}
