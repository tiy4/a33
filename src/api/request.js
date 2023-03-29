
import Service from "./config"

//封装get请求
const get = (config) => {
    return Service({
        ...config,
        method: 'get',
        params: config.data
    })
}

//封装post请求
const post = (config) => {
    return Service({
        ...config,
        method: 'post',
        params: config.data
    })
}

export default {
    get,
    post,
}