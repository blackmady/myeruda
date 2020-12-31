<!--
 * @Author: your name
 * @Date: 2019-11-04 20:38:33
 * @LastEditTime: 2019-11-12 00:36:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /src/github.com/blackmady/myeruda/demo/src/App.vue
 -->
<template>
    <div id="app">
        <img
            v-if="!isMobile"
            alt="扫码体验"
            :src="qrcode"
        />
        <!-- <h3 style="padding:10px;text-align:center"><span v-if="!isMobile">扫码用手机打开，</span>三指长按页面任意位置1秒后打开eruda调试界面,长按控制按钮打开隐藏菜单</h3> -->
        <h3 style="padding: 10px; text-align: center">
            <span v-if="!isMobile">扫码用手机打开，</span>
            <pre style="font-size: 12px; text-align: left">
    mode:[默认:1] 模式 
      1:sessionStorage+query 
      2:localStorage+query 
      3:auto 自动打开
    setting:[默认:{}] 
      eruda.init(setting) 时传入的setting参数
    key:[默认:'__myeruda__'] 
      关键的key 用于sessionStorage 和query的key
    envs:[默认:['development', 'test']] 
      根据实际需要的情况来定，只有这些环境才会开启
      开发环境:development,测试环境:test,生产环境:production
    
    推荐使用方法: 
    myeruda({envs:['development','test','production']})
    在需要打开eruda的时候可以在链接中加入 ?__myeruda__=0
    </pre
            >
        </h3>
        <br />
        <p>
            <a href="https://github.com/blackmady/myeruda#使用说明">查看文档</a>
        </p>
        <br />
        <p>
            <a href="https://npm.taobao.org/package/myeruda">返回npm</a>
        </p>
    </div>
</template>

<script>
import QRCode from 'qrcode'
const myUrl = 'http://none.gitee.io/myeruda/?__myeruda__=1'
export default {
    name: 'app',
    data() {
        return {
            qrcode: '',
            isMobile:
                navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/Windows Phone/i),
        }
    },
    created() {
        QRCode.toDataURL(myUrl).then((url) => {
            this.qrcode = url
        })
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    user-select: none;
}
</style>
