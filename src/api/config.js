import axios from "axios";
// import { Message } from "element-ui";

// 创建axios
// const Service = axios.create({
//     baseURL: 'http://175.178.131.223:8400',
//     headers: {
//         'Content-Type': "application/json;charset=UTF-8"
//     },
//     timeout: 10000
// })

//请求拦截器
// Service.interceptors.request.use((config) => {
//     config.headers.common['Author'] = window.sessionStorage.getItem('token') === null ? null : '8'
//     return config
// })

//响应拦截器
// Service.interceptors.response.use((response) => {
//     //获取接口返回结果
//     const res = response.data
//     //返回0是成功
//     if (res.status === 0) {
//         return res
//     }
//     //信息返回
//     else {
//         Message.error(res.message || '网络异常')
//         return res
//     }
// })


/**
     * get 方法 从服务端获取数据
     * @param {*} way 请求地址
     * @param {*} ip default = 'localhost'
     */
export async function get(way, ip = 'localhost') {
    let result;
    let PORT = window.location.port;
    await axios.get(`http://${ip}:${PORT}${way}`).then((res) => {
        result = res.data;
    }).catch(err => {
        console.log(err);
    })
    // console.log(result);
    return result;
}

/**
 * post 方法 发送数据给服务端
 * @param {*} way  请求路径
 * @param {*} data 发送的数据
 * @param {*} ip   default = 'localhost'
 */
export async function post(way, data, ip = 'localhost') {
    let PORT = window.location.port;
    console.log(ip);
    await axios.post(`http://${ip}:${PORT}${way}`,
        data
    ).then((res) => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

export default {
    post,
    get,
}