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
function erudaInit(setting = {}) {
  return require('eruda').init(setting);
}
function myeruda(opt?: IOption | Function) {
  if (typeof opt !== 'function') {
    opt = { mode: 1, envs: ['development', 'test'], key: '__myeruda__', setting: {}, ...opt };
    if (!opt.envs.includes(process.env.NODE_ENV || '')) {
      return false;
    }
  }
  if (typeof opt === 'function') {
    const eruda = require('eruda');
    const setting = opt(eruda);
    if (setting) eruda.init(typeof setting === 'object' ? setting : {});
    return true;
  }
  if (opt.mode === 3) {
    return erudaInit(opt.setting)
  }
  const storage = [sessionStorage, localStorage][opt.mode - 1];
  const hasQuery = location.search.includes(opt.key);
  const needLoad = storage.getItem(opt.key);
  if (hasQuery) {
    storage.setItem(opt.key, Date.now().toString())
  }
  // const { key, ...setting } = opt;
  if (needLoad) {
    return erudaInit(opt.setting)
  }
}

export default myeruda;

// 根据 ?__myeruda__
// if search.includes('__myeruda__') 存一个key到sessionStorage作为开启调试的标志

// myeruda({
//   key: '__myeruda__' //默认值
// })
// myeruda(function (eruda) {  // 如果此函数返回false则不做任何操作，但可以直接操作eruda
//   eruda.init();
// })