/*
 * @Author: None
 * @LastEditors: None
 * @Date: 2019-11-01 15:44:42
 * @LastEditTime: 2019-11-11 16:50:21
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
// import myeruda from 'myeruda'
import myeruda from '../../lib/index'
// 在生产环境模式下开启(preload为false时：触发myeruda时异步加载eruda)
myeruda({touches:1,onlyDev:false,preload:true})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
