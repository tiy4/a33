import axios from 'axios'

/**
 * @author guibin
 * @usage 获取data数据
 */
function getData(){
    axios({
        method: 'get',
        url:"http://localhost:8080/data/data.json",
    }).then((res)=>{
        console.log(res);
    });
}

/**
     * get 方法 从服务端获取数据
     * @param {*} way 请求地址
     * @param {*} ip default = '127.0.0.1'
     */
export async function get(way,ip = '127.0.0.1'){
    let result;
    let PORT = window.location.port;
    await axios.get(`http://${ip}:${PORT}${way}`).then((res)=>{
      result = res.data;
    }).catch(err=>{
      console.log(err);
    })
    // console.log(result);
    return result;
  }

/**
 * post 方法 发送数据给服务端
 * @param {*} way  请求路径
 * @param {*} data 发送的数据
 * @param {*} ip   default = '127.0.0.1'
 */
export async function post(way,data,ip = '127.0.0.1'){
    let PORT = window.location.port;
    // console.log(ip);
    await axios.post(`http://${ip}:${PORT}${way}`,
      data
    ).then((res)=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

export{
    getData,
}