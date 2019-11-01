# myeruda
一个快速集成于现在开发环境的彩蛋触发式eruda
参数如下：
```javascript
// 接口参数
interface IOption{
  // 触点数,默认2
  touches?:number
  // 触发时长,默认1000(1秒)
  duration?:number
  // 仅在开发模式启用此功能,默认true
  onlyDev?:boolean
  // 错误自动触发,默认false
  onErrorShow?:boolean
}
// 使用
import myeruda from 'myeruda
// 三指长按触发
myeruda({touches:3})
```
