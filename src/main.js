import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 vant 组件库
import Vant from '@/vant'
// 引入 mixin 混入 H5+
import { onPlusReady } from '@/mixin'

Vue.use(Vant)

Vue.config.productionTip = false

// Vue 全局混入
Vue.mixin({
  beforeCreate: function () {
    onPlusReady(function () {
      this.plusReady = true
    }, this)
  },
  methods: {
    onPlusReady: onPlusReady
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
