import Axios from 'axios';
import cookie from '@/utils/cookie';

const AXIOS_INSTANCE = Axios.create({
    timeout: 10000,
    baseURL: process.env.BASE_URL
});


// 请求拦截器
AXIOS_INSTANCE.interceptors.request.use(
    (config) => {
        // 在发送之前做些什么
        config.data = JSON.stringify(config.data);
        config.headers['Content-Type'] = "application/json";
        // config.headers['uid'] = cookie.getCookie('uid');
        config.headers['Auth'] = cookie.getCookie('usertoken');
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
AXIOS_INSTANCE.interceptors.response.use(
    (response) => {
        // 对请求返回的数据做处理
        // 状态码处理
        if (response.status >= 200 && response.status < 400) {
            if (response.data || response.config.responseType === 'arraybuffer') { // rsCode待确定
                return response.data;
            }
        }
    },
    (error) => {
        // 错误提示
        return Promise.reject(error);
    }
);

export default AXIOS_INSTANCE;
