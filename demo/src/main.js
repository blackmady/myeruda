/*
 * @Author: None
 * @LastEditors: Please set LastEditors
 * @Date: 2019-11-01 15:44:42
 * @LastEditTime: 2019-11-12 00:24:46
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
// import myeruda from 'myeruda'
import myeruda from '../../lib/index'
// 【v1:废弃】在生产环境模式下开启(preload为false时：触发myeruda时异步加载eruda)
// 【v1:废弃】myeruda({touches:3,onlyDev:false,preload:true})

// declare function myeruda(opt?: { mode: 1, envs: ['development', 'test'], key: '__myeruda__', setting: {}} | Function): any;
// 如果opt为函数则先执行函数，返回为false,则什么也不做，返回为true则自动初始化，函数的参数为eruda,此时也可以自行初始化，但需要返回false
// 如果opt为对象有如下参数
/**
 * mode:[默认:1] 模式 1:sessionStorage+query 2:localStorage+query 3:auto 自动打开
 * setting:[默认:{}] eruda.init(setting) 时传入的setting参数
 * key:[默认:'__myeruda__'] 关键的key 用于sessionStorage 和query的key
 * envs:[默认:['development', 'test']] 根据实际需要的情况来定，只有这些环境才会开启
 * 
 * 推荐使用方法: myeruda({ envs:['development', 'test', 'product'] })
 * 在需要打开eruda的时候可以在链接中加入 ?__myeruda__=0
 * 
 */
myeruda({ mode: 3 })

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
