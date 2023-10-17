import { post, get } from '@/http/request';

// 菜单-数据
export function api_menu_page(data) {
    return post('/manage/auth/page', data);
}

// 角色-列表
export function api_role_list(data) {
    return post('/manage/role/list', data);
}

// 角色-保存
export function api_role_add(data) {
    return post('/manage/role/add', data);
}
// 角色-删除
export function api_role_del(data) {
    return post('/manage/role/del', data);
}
// 角色-编辑
export function api_role_edit(data) {
    return post('/manage/role/edit', data);
}
// 角色-明细
export function api_role_detail(data) {
    return post('/manage/role/detail', data);
}
