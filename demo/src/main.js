import Vue from 'vue'
import App from './App.vue'
import myeruda from './utils'
myeruda()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
