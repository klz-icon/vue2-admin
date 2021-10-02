import axios from 'axios'
import { Message } from 'element-ui'

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API;
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://old.web-jshtml.cn/vue_admin_api
    timeout: 15000,   // 超时
    // 网络请求接口，假设 5000
    // 1000 2000，
});


// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // if (token) {
        //     config.headers.Authorization = 'Bearer' + token;
        // }
        return config;
    }, error => {
         // 对请求错误做些什么
        return Promise.error(error);
    }
)


// 添加响应拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        // if (response.status === 200) {
        //     return Promise.resolve(response);
        // } else {
        //     return Promise.resolve(response);
        // }
        if(data.resCode !== 0) {
            Message.error(data.message);
            return Promise.reject(data);
        }else{
            return response;
            // return Promise.resolve(data);
        }
    }, error => {
            // 对响应错误做点什么
    return Promise.reject(error);
    })


export default service