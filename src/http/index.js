import axios from 'axios'
import { Message } from 'view-design';

const http = axios.create({
    timeout: 10000,
    baseURL: 'http://localhost:5000'
})

// 请求拦截
// 每一次发请求之前做的事情
http.interceptors.request.use((config) => {
    // 请求头加上token
    // token: 后端签发的令牌 一般情况下是登录成功之后
    // token是根据用户信息生成的
    // token是有过期时间的
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    const status = err.response && err.response.status
    if (status === 401) {
        Message.error('登录过期')
    }
    if (status === 403) {
        Message.error('没有权限')
    }
    if (status === 404) {
        Message.error('路径错误')
    }
    if (status === 500) {
        Message.error('服务器错误')
    }
    if (status === 503) {
        Message.error('服务器维护')
    }
    return Promise.reject(err)
})


export default http