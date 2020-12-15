import AXIOS_INSTANCE from './index';
import qs from 'qs';

/**
 * 登录
 */
export const login = (opt) => {
    return AXIOS_INSTANCE.post('/api/appoint_bk/admin_user/login', opt);
};

/**
 * 退出
 */
// export const logout = (opt) => {
//     return AXIOS_INSTANCE.get('api/user/logout', {params: opt});
// };

/**
 * 用户信息
 */
export const getUserInfo = (opt) => {
    return AXIOS_INSTANCE.get('/api/appoint_bk/admin_user_info');
};
