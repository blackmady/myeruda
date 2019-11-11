declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    eruda: any
  }
}
interface IOption {
  // 开发模式开启的情况下异步预加载eruda
  preload?: boolean
  // 触点数,默认2
  touches?: number
  // 触发时长,默认1000(1秒)
  duration?: number
  // 仅在开发模式启用此功能,默认true
  onlyDev?: boolean
  // 生产环境下开启myeruda初始化提示
  prodConsole?: boolean
  // 错误自动触发,默认false
  onErrorShow?: boolean
  // toolBar 菜单，长按eruda按钮时显示
  menu?: {
    [p: string]: null | {
      label: string
      fn: (...args:any) => void
    }
  }
}

function longTap(el:HTMLElement,duration=1000){
    let touchstartTime=0
    let tid:NodeJS.Timeout
    const touch= (touches:number,callback?:(e:TouchEvent)=>any):any=>{
        el.addEventListener('touchstart',e=>{
            clearInterval(tid)
            tid=setInterval(async ()=>{
                touchstartTime += 100
                if (touchstartTime === duration) {
                    // tslint:disable-next-line:no-unused-expression
                    callback?.(e)
                    clearInterval(tid)
                    touchstartTime = 0
                }
            },100)
        })
        el.addEventListener('touchend',()=>{
            touchstartTime = 0
            clearInterval(tid)
        })
    }
    return touch
}

function myeruda(opt?: IOption) {
  const isDev = process.env.NODE_ENV === 'development'
  let el: HTMLElement
    let ctrlBtn:HTMLElement
  let touchstartTime = 0
  let tid: NodeJS.Timeout
  let csl
  let eruda
    let menu
  // tslint:disable-next-line: variable-name
  const _opt: IOption = {
    touches: 3,
    duration: 1000,
    onlyDev: true,
    preload: false,
    onErrorShow: false,
    prodConsole: false,
    menu: {}
  }
    // tslint:disable-next-line:variable-name
  const _menu = {
    refresh: {
      label: '带参刷新',
      fn: () => {
        const sch = location.search
        if (sch.indexOf('?') === 0) {
          location.search = sch.replace(/^\?/, `?__myeruda__=${Date.now()}&`)
        }else{
            location.search=`?__myeruda__=${Date.now()}`
        }
      }
    },
    clearStorage: {
      label: '清除Storage',
      fn() {
        localStorage.clear()
        sessionStorage.clear()
      }
    },
    clearCookie: {
      label: '清除cookie',
      fn() {
        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
          for (let i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString()
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain.replace(/\w*\.(\w*\.\w*)/, '$1') + ';expires=' + new Date(0).toUTCString()
          }
        }
      }
    },
  }
  Object.assign(_opt, opt)
  if (_opt.menu) {
    // tslint:disable-next-line:forin
    for (const m in _menu) {
      _opt.menu[m] = _opt.menu[m] ?? _menu[m]
    }
  }
  if (isDev || !_opt.onlyDev) {
    bindEvents()
  } else {
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
  function devlog(...args) {
    if (isDev || _opt.prodConsole) {
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
      ctrlBtn=el.children[1] as HTMLElement
    el.style.display = 'none'
    csl = eruda.get('console')
    if (_opt.onErrorShow) {
      csl.on('error', () => {
        el.style.display = ''
      })
    }
    longTap(ctrlBtn)(1,()=>{
        openMenu()
    })
    devlog(`myeruda初始化完毕：当前为${process.env.NODE_ENV}模式，${_opt.touches}指长按${_opt.duration! / 1000}秒后开启！`)
  }
  function openMenu(){
      if(!_opt.menu) {return false }
      if(!menu) {
        menu=makeMenuLayer()
      }
      document.body.append(menu)
  }
  function makeMenuLayer() {
      const div=`<div class="myeruda">
        <style>
            .myeruda{
                position: fixed;
                z-index: 100000;
                width:100%;
                height: 100%;
                top:0;
                left:0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .myeruda-menu{
                width:80%;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                border-radius: 5px;
                background:rgba(255,255,255,0.9)
            }
            .myeruda-menu a{
                display: block;
                height: 6vh;
                line-height: 6vh;
                text-align: center;
                color:#333;
                border-bottom: 1px solid #f0f0f0;
                text-decoration: none;
            }
        </style>
        <div class="myeruda-menu"></div>
      </div>`
      const $links=document.createDocumentFragment()
      const $div=document.createElement('div')
      $div.innerHTML=div
      for(const m in _opt.menu){
          if(_opt.menu[m]===null) {continue }
          const a=document.createElement('a')
          a.href='javascript:'
          a.innerText=_opt.menu[m]!.label
          const handler=e=>{
              _opt.menu![m]!.fn(e)
              a.removeEventListener('click',handler)
              document.body.removeChild($div)
          }
          a.addEventListener('click',handler)
          $links.append(a)
      }
      // tslint:disable-next-line:no-unused-expression
      $div.querySelector('.myeruda-menu')?.append($links)
      return $div
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

    window.addEventListener('touchend', () => {
      touchstartTime = 0
      clearInterval(tid)
    })
  }
}
export default myeruda
