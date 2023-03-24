// 导入Vue和VueRouter包
import Vue from 'vue'
import VueRouter from 'vue-router'

// 把 VueRouter 安装为 Vue 项目的插件
// Vue.use() 函数的作用，就是来安装插件的
Vue.use(VueRouter)

// 创建路由的实例对象
const router = new VueRouter({
    // routes 是一个数组，作用：定义 “hash 地址” 与 “组件” 之间的对应关系
    routes: [
      // 路由规则
      {
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home', 
        component: ()=>import('@/components/home/MainHome.vue')
      },
      { 
        path: '/chart', 
        component: ()=>import('@/components/charts/MyCharts.vue') 
      },
      { 
        path: '/date', 
        component: ()=>import('@/components/date/StaffDutySchedule.vue')
      },
      { 
        path: '/mytest', 
        component: ()=>import('@/components/home/MyTest.vue')
      },
      { 
        path: '/shoprule', 
        component: ()=>import('@/components/date/ShopRule.vue')
      },
      { 
        path: '/emploerhobby', 
        component: ()=>import('@/components/date/EmploerHobby.vue')
      },
    ]
  })
// 向外共享路由的实例对象
export default router