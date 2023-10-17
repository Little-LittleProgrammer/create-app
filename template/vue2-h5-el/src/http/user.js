import { post, get } from '@/http/request';

export function api_user_menus() {
    return get('/manage/user/auths');
}
