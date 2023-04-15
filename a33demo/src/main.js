import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from '@/router/index'
import echarts from 'echarts'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

axios.defaults.baseURL = '/api'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  axios,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')