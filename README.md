<!--
 * @Author: your name
 * @Date: 2019-11-04 20:38:33
 * @LastEditTime: 2019-11-12 00:45:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /src/github.com/blackmady/myeruda/README.md
 -->

# myeruda

一个快速集成于现代开发环境的彩蛋触发式调试工具(基于 eruda),配置简单,不需要按环境按需导入
配置即可，压缩前 2k 左右,加上 eruda 的大小

> mode 为 1 时，当 sessionStorage 中存在一条 key 为配置的 key 或默认为**myeruda**时即自动打开调式工具，或者 serch 中包含它也是

## 更新

### v2.0.0 修改打开触发方式

> 可通过在链接中加入一个指定的参数开启或关闭此功能

### v1.3.0 加入自定义菜单功能

> 长按 eruda 控制按钮打开菜单,有以下默认菜单

- 强制刷新:解决微信浏览器等环境下调试时烦人的缓存问题
- 清理 Storage (localStorage,sessionStorage)
- 清理 Cookie (当前域名及基域名)

### v1.2.0 (按需打包与加载，只管调用，环境问题交给我)

> 生产环境不再打包 eruda，使用异步加载的方式保证在生产环境下依然可以正常使用（前提是当你配置了 onlyDev:false 时）

[Github 地址](https://github.com/blackmady/myeruda)

[DEMO](https://blackmady.github.io/myeruda/)

<!-- ## <img src="./v1.3.1.png" height="100"/> -->

<img src="./v1.2.2.png" height="600"/>

### 使用说明

> 此工具由 typescript 编写,支持 typescript 和 javascript


```shell
  # 安装
  npm i myeruda -S
```

```javascript
// 使用
import myeruda from 'myeruda'
// 三指长按触发,在生产环境模式下开启，preload为false时：事件触发后从CDN异步加载eruda,长按控制按钮可以打开菜单
// myeruda({touches:3,onlyDev:false,preload:true})  //v1.x
myeruda() //v2
```

参数说明如下：

```javascript
// option参数说明
// v1.x
// interface IOption {
//   // 生产环境下开启里，从CDN预加载eruda
//   preload?: boolean
//   // 触点数,默认3
//   touches?: number
//   // 触发时长,默认1000(1秒)
//   duration?: number
//   // 仅在开发模式启用此功能,默认true
//   onlyDev?: boolean
//   // 生产环境下开启myeruda初始化提示
//   prodConsole?:boolean
//   // 错误自动触发,默认false
//   onErrorShow?: boolean
//   // toolBar 可自定义菜单，长按eruda按钮时显示
//   menu?: {
//     [p: string]: null | {
//       // 菜单名称
//       label: string
//       // 菜单点击后执行的函数
//       fn: (...args:any) => void
//     }
//   }
// }
// v2
interface IOption {
  // 关键的key 用于sessionStorage 和query的key
  key: string
  // 哪些环境开启此功能
  envs: string[]
  // eruda的配置
  setting?: object
  // 模式 1:sessionStorage+query 2:localStorage+query 3:auto 自动开启
  mode: number
}
```
