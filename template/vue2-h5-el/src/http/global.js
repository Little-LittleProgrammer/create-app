import { post, get } from '@/http/request';

export function api_global_env() {
    return get('/site/check-env');
}

// 用户授权菜单
export function api_global_user_auths() {
    return get('/manage/user/auths');
}
