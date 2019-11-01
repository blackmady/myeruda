import Vue from 'vue'
import App from './App.vue'
import myeruda from 'myeruda'
// 生产环境下开启
myeruda({onlyDev:false})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
