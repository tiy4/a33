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
    
    // devServer代理配置
    proxy: {
      // 客流量
      '/passenger_flow':{ // 表示需要代理的地址
        // 是否支持 websocket
        ws: false,
        // 反向代理地址
        target: 'http://175.178.131.223:8400',
        // target: 'http://8.130.32.3:8888',
        changeOrigin: true,
        secure: false,
        // 请求地址重写，类似Nginx的Rewite功能
        pathRewrite: {
          '^/': '/'
        }
      },
      // 门店
      '/shop':{ // 表示需要代理的地址
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
      },
      // 员工
      '/staff':{ // 表示需要代理的地址
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
      },
      // 员工偏好
      '/staff_hobby':{ // 表示需要代理的地址
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
      },
      // 排班表
      '/Shift':{ // 表示需要代理的地址
        // 是否支持 websocket
        ws: false,
        // 反向代理地址
        target: 'http://43.138.133.120:9191',
        changeOrigin: true,
        secure: false,
        // 请求地址重写，类似Nginx的Rewite功能
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
};