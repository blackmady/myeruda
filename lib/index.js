var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function erudaInit(setting) {
    if (setting === void 0) { setting = {}; }
    return require('eruda').init(setting);
}
function myeruda(opt) {
    if (typeof opt !== 'function') {
        opt = __assign({ mode: 1, envs: ['development', 'test'], key: '__myeruda__', setting: {} }, opt);
        if (!opt.envs.includes(process.env.NODE_ENV || '')) {
            return false;
        }
    }
    if (typeof opt === 'function') {
        var eruda = require('eruda');
        var setting = opt(eruda);
        if (setting)
            eruda.init(typeof setting === 'object' ? setting : {});
        return true;
    }
    if (opt.mode === 3) {
        return erudaInit(opt.setting);
    }
    var storage = [sessionStorage, localStorage][opt.mode - 1];
    var hasQuery = location.search.includes(opt.key);
    var needLoad = storage.getItem(opt.key);
    if (hasQuery) {
        storage.setItem(opt.key, Date.now().toString());
    }
    // const { key, ...setting } = opt;
    if (needLoad) {
        return erudaInit(opt.setting);
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
