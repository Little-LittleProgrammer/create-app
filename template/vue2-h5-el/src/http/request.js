import axios from 'axios';
import qs from 'qs';
import store from '../store';
import router from '../router';
import { Message } from 'element-ui';
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 填写域名
    timeout: 5000
});

let _tempRequestUrl = '';
// http request 拦截器
service.interceptors.request.use(
    config => {
        if (process.env.NODE_ENV == 'development'){
            if (!(config.url.match(/^http/) != null || config.url.match(/^\/\//) != null)){
                config.url = '/api' + config.url; //  配置转发
            }
        }
        if (_tempRequestUrl != config.url){
            _tempRequestUrl = config.url;
            setTimeout(() => {
                _tempRequestUrl = '';
            }, 500);
        } else {
            Message.error('请勿多次操作');
        }
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        config.data = qs.stringify(config.data);
        return config;
    },
    err => Promise.reject(err)
);

// 响应拦截器即异常处理
service.interceptors.response.use(
    res => {
        store.commit('SET_DATE', new Date(res.headers.date));
        if (res.data.code == 404){
            router.replace({
                path: '/admin/error'
            });
        } else if (res.data.code == 400){
            Message.error(res.data.message);
        } else if (res.data.code == 403){
            window.location.reload();
        }
        return res.data;
    },
    err => {
        if (err && err.response) {
            const erroMes = {
                '400': '错误请求',
                '401': '未授权，请重新登录',
                '403': '拒绝访问',
                '404': '请求错误,未找到该资源',
                '405': '请求方法未允许',
                '408': '请求超时',
                '500': '服务器端出错',
                '501': '网络未实现',
                '502': '网络错误',
                '503': '服务不可用',
                '504': '网络超时',
                '505': 'http版本不支持该请求'
            };
            console.log(erroMes[err.response.status] ? erroMes[err.response.status] : `连接错误${err.response.status}`);
        } else {
            console.log('连接到服务器失败');
        }
        return Promise.resolve(err.response);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params) {
    if (params) params.t = Date.now();
    else params = { t: Date.now() };
    return service.get(url, { params });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    url += '?t=' + Date.now();
    return service.post(url, data);
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data) {
    return service.patch(url, data);
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data) {
    return service.put(url, data);
}

/**
 * @description 上传文件 单独封装解决文件上传 http头问题
 * @param {string} url 接口地址
 * @param {Object} data 发送数据
 * @returns {Promise}
 */
export function upload(url, data) {
    url = (process.env.NODE_ENV === 'development') ? process.env.VUE_APP_BASE_API + '/api' + url : url;
    return axios.post(url, data);
}
