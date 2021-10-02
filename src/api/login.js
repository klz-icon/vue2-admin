import service from '@/utils/request.js';     //导入request中创建的实例
import qs from 'qs'     //根据需求是否导入qs模块
//参考文档：http://axios-js.com/zh-cn/docs/

//获取验证码
export function getverifyCode(data){
    return service.request({
        method: "post",
        url: "/getSms/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}

//登录接口
export function login(data){
    return service.request({
        url: '/login',
        method: 'post',
        data: qs.stringify(data)
    })
}