declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    eruda: any
  }
}
interface IOption {
  preload?: boolean
  // 触点数,默认2
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
function myeruda(opt?: IOption) {
  const isDev = process.env.NODE_ENV === 'development'
  let el: HTMLElement
  let touchstartTime = 0
  let tid: NodeJS.Timeout
  let csl
  let eruda
  // tslint:disable-next-line: variable-name
  const _opt: IOption = {
    touches: 2,
    duration: 1000,
    onlyDev: true,
    preload: false,
    onErrorShow: false,
    prodConsole:false,
  }
  Object.assign(_opt, opt)
  if (isDev || !_opt.onlyDev) {
    bindEvents()
  }else{
    return
  }
  if (process.env.NODE_ENV === 'development') {
    import('eruda').then(m => {
      eruda = m.default
      erudaInit()
    })
  }
  if (!_opt.preload && !isDev) {
    devlog(`myeruda尚未加载，可通过${_opt.touches}指长按${_opt.duration! / 1000}秒加载并打开！`)
  } else if (!_opt.onlyDev && !isDev) {
    loadEruda().then(() => {
      erudaInit()
    })
  }
  function devlog(...args){
    if(isDev || _opt.prodConsole){
      console.log(...args)
    }
  }
  async function loadEruda() {
    const url = '//cdn.bootcss.com/eruda/1.5.8/eruda.min.js'
    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
    return new Promise((resolve, reject) => {
      script.onload = () => {
        eruda = window.eruda
        resolve()
      }
      script.onerror = reject
    })
  }

  function erudaInit() {
    eruda.init()
    el = eruda._$el[0]
    el.style.display = 'none'
    csl = eruda.get('console')
    if (_opt.onErrorShow) {
      csl.on('error', () => {
        el.style.display = ''
      })
    }
    devlog(`eruda初始化完毕：当前为${process.env.NODE_ENV}模式，${_opt.touches}指长按${_opt.duration! / 1000}秒后开启！`)
  }
  function bindEvents() {
    window.addEventListener('touchstart', e => {
      return (
        e.touches.length === _opt.touches &&
        (() => {
          clearInterval(tid)
          touchstartTime = 0
          tid = setInterval(async () => {
            touchstartTime += 100
            if (touchstartTime === _opt.duration) {
              devlog('触发myeruda')
              if (!eruda) {
                await loadEruda()
                erudaInit()
              }
              eruda.show()
              el.style.display = el.style.display === 'none' ? '' : 'none'
              clearInterval(tid)
              touchstartTime = 0
            }
          }, 100)
          return true
        })()
      )
    })

    window.addEventListener('touchend', e => {
      touchstartTime = 0
      clearInterval(tid)
    })
  }
}
export default myeruda
