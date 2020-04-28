import Vue from 'vue'
import './plugins/axios'
import './plugins/vant.js'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import echarts from 'echarts'
import 'swiper/dist/css/swiper.css'
import "./exit";//监听返回
import './common/less/reset.less'
import './flexible.js'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(echarts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default router