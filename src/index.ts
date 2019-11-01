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
function myeruda(opt?:IOption) {
  let el:HTMLElement
  let touchstartTime = 0
  let tid:NodeJS.Timeout
  let csl
  let eruda
  // tslint:disable-next-line: variable-name
  const _opt:IOption = {
    touches: 2,
    duration: 1000,
    onlyDev: true,
    onErrorShow: false
  }
  Object.assign(_opt, opt)
  if (!_opt.onlyDev || process.env.NODE_ENV === 'development') {
    init()
  }
  function init () {
    eruda = require('eruda')
    eruda.init()
    el = eruda._$el[0]
    el.style.display = 'none'
    csl = eruda.get('console')
    if (_opt.onErrorShow) {
      csl.on('error', ()=> {
        el.style.display = ''
      })
    }
    bindEvents()
  }
  function bindEvents () {
    window.addEventListener('touchstart', e=> {
      return e.touches.length === _opt.touches && (()=> {
        clearInterval(tid)
        touchstartTime = 0
        tid = setInterval(()=> {
          touchstartTime += 100
          if (touchstartTime === _opt.duration) {
            eruda.show()
            el.style.display = el.style.display === 'none' ? '' : 'none'
            clearInterval(tid)
            touchstartTime = 0
          }
        }, 100)
        return true
      })()
    })

    window.addEventListener('touchend', e=> {
      touchstartTime = 0
      clearInterval(tid)
    })
  }
}
export default myeruda
