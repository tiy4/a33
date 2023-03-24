const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
})
module.exports = {
  lintOnSave:false
}
module.exports = {
  // 配置跨域代理
  devServer: {
    // 代理目标的路径
    // proxy: 'http://localhost:3000'

    // 如果直接配置这个 proxy 会出现
    // 载入页面时，与 ws://175.178.131.223:8400/ws 的连接中断
    // proxy: 'http://175.178.131.223:8400',
    
    proxy: { // devServer代理配置
      '^/':{ // 表示需要代理的地址
        // 是否支持 websocket
        ws: false,
        // 反向代理地址
        target: 'http://175.178.131.223:8400',
        changeOrigin: true,
        secure: false,
        // 请求地址重写，类似Nginx的Rewite功能
        pathRewrite: {
          '^/': '/'
        }
      }
    }
    // proxy: {
    //     '/api': { // 匹配所有 /api 开头的路径
    //         // 代理目标的基础路径
    //         target: 'http://localhost:3000/api',   
    //         // 请求来自于。即控制请求头中host数据。
    //         // 默认为 true说谎:来自3000;
    //         // false如实回答来自代理服务器8081
    //         changeOrigin: true,
    //         // 用于支持 Websocket
    //         ws: true,
    //         // 路径重写，匹配api开头的字符串，
    //         // 并将api替换为空字符串
    //         pathRewrite: {
    //             '^/api': '',  
    //         }
    //     }
    // }
  }
};