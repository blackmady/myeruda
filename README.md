# myeruda
一个快速集成于现代开发环境的彩蛋触发式调试工具(基于eruda)

> 调试工具界面默认隐藏，可配置触发打开方式（默认为双指长按界面1秒），可集成至生产环境，在生产环境下eruda会从CDN(bootcdn.cn)异步加载，不会打包到本地，解除了打包后文件太大的困扰

### v1.2.0 (按需打包与加载，只管调用，环境问题交给我)
> 生产环境不再打包eruda，使用异步加载的方式保证在生产环境下依然可以正常使用（前提是当你配置了onlyDev:false 时）

[DEMO](https://blackmady.github.io/myeruda/)

![界面示意图](v1.2.2.png)

参数如下：
```javascript
// option参数说明
interface IOption {
  // 生产环境下开启里，从CDN预加载eruda
  preload?: boolean
  // 触点数,默认3
  touches?: number
  // 触发时长,默认1000(1秒)
  duration?: number
  // 仅在开发模式启用此功能,默认true
  onlyDev?: boolean
  // 生产环境下开启myeruda初始化提示
  prodConsole?:boolean
  // 错误自动触发,默认false
  onErrorShow?: boolean
}
```
```javascript
// 使用
import myeruda from 'myeruda'
// 三指长按触发,在生产环境模式下开启，preload为false时：事件触发后从CDN异步加载eruda
myeruda({touches:3,onlyDev:false,preload:true})
```
