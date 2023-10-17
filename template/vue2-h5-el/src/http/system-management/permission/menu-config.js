import { post, get } from '@/http/request';

// 菜单-列表
export function api_menu_list(data) {
    return post('/manage/auth/menu', data);
}

// 菜单-添加
export function api_menu_add(data) {
    return post('/manage/auth/add', data);
}
// 菜单-删除
export function api_menu_del(data) {
    return post('/manage/auth/del', data);
}
// 菜单-编辑
export function api_menu_edit(data) {
    return post('/manage/auth/edit', data);
}
// 菜单-移动、设置排序
export function api_menu_sort(data) {
    return post('/manage/auth/sort', data);
}
