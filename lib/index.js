var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function longTap(el, duration) {
    var _this = this;
    if (duration === void 0) { duration = 1000; }
    var touchstartTime = 0;
    var tid;
    var touch = function (touches, callback) {
        el.addEventListener('touchstart', function (e) {
            clearInterval(tid);
            tid = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    touchstartTime += 100;
                    if (touchstartTime === duration) {
                        // tslint:disable-next-line:no-unused-expression
                        callback === null || callback === void 0 ? void 0 : callback(e);
                        clearInterval(tid);
                        touchstartTime = 0;
                    }
                    return [2 /*return*/];
                });
            }); }, 100);
            return false;
        });
        el.addEventListener('touchend', function () {
            touchstartTime = 0;
            clearInterval(tid);
        });
    };
    return touch;
}
function myeruda(opt) {
    var _a;
    var isDev = process.env.NODE_ENV === 'development';
    var el;
    var ctrlBtn;
    var touchstartTime = 0;
    var tid;
    var csl;
    var eruda;
    var menu;
    // tslint:disable-next-line: variable-name
    var _opt = {
        touches: 3,
        duration: 1000,
        onlyDev: true,
        preload: false,
        onErrorShow: false,
        prodConsole: false,
        menu: {}
    };
    // tslint:disable-next-line:variable-name
    var _menu = {
        refresh: {
            label: '强制刷新',
            fn: function () {
                var sch = location.search.replace(/__myeruda__=\d*&?/, '');
                if (sch.indexOf('?') === 0) {
                    location.search = sch.replace(/^\?/, "?__myeruda__=" + Date.now() + "&");
                }
                else {
                    location.search = "?__myeruda__=" + Date.now();
                }
            }
        },
        clearStorage: {
            label: '清除Storage',
            fn: function () {
                localStorage.clear();
                sessionStorage.clear();
            }
        },
        clearCookie: {
            label: '清除cookie',
            fn: function () {
                var keys = document.cookie.match(/[^ =;]+(?==)/g);
                if (keys) {
                    for (var i = keys.length; i--;) {
                        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
                        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
                        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain.replace(/\w*\.(\w*\.\w*)/, '$1') + ';expires=' + new Date(0).toUTCString();
                    }
                }
            }
        },
    };
    Object.assign(_opt, opt);
    if (_opt.menu) {
        // tslint:disable-next-line:forin
        for (var m in _menu) {
            _opt.menu[m] = (_a = _opt.menu[m]) !== null && _a !== void 0 ? _a : _menu[m];
        }
    }
    if (isDev || !_opt.onlyDev) {
        bindEvents();
    }
    else {
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        import('eruda').then(function (m) {
            eruda = m.default;
            erudaInit();
        });
    }
    if (!_opt.preload && !isDev) {
        devlog("myeruda\u5C1A\u672A\u52A0\u8F7D\uFF0C\u53EF\u901A\u8FC7" + _opt.touches + "\u6307\u957F\u6309" + _opt.duration / 1000 + "\u79D2\u52A0\u8F7D\u5E76\u6253\u5F00\uFF01");
    }
    else if (!_opt.onlyDev && !isDev) {
        loadEruda().then(function () {
            erudaInit();
        });
    }
    function devlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isDev || _opt.prodConsole) {
            console.log.apply(console, args);
        }
    }
    function loadEruda() {
        return __awaiter(this, void 0, void 0, function () {
            var url, script;
            return __generator(this, function (_a) {
                url = '//cdn.bootcss.com/eruda/1.5.8/eruda.min.js';
                script = document.createElement('script');
                script.src = url;
                document.head.appendChild(script);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        script.onload = function () {
                            eruda = window.eruda;
                            resolve();
                        };
                        script.onerror = reject;
                    })];
            });
        });
    }
    function erudaInit() {
        eruda.init();
        el = eruda._$el[0];
        ctrlBtn = el.children[1];
        el.style.display = 'none';
        csl = eruda.get('console');
        if (_opt.onErrorShow) {
            csl.on('error', function () {
                el.style.display = '';
            });
        }
        longTap(ctrlBtn)(1, function () {
            openMenu();
        });
        devlog("myeruda\u521D\u59CB\u5316\u5B8C\u6BD5\uFF1A\u5F53\u524D\u4E3A" + process.env.NODE_ENV + "\u6A21\u5F0F\uFF0C" + _opt.touches + "\u6307\u957F\u6309" + _opt.duration / 1000 + "\u79D2\u540E\u5F00\u542F\uFF01");
    }
    function openMenu() {
        if (!_opt.menu) {
            return false;
        }
        if (!menu) {
            menu = makeMenuLayer();
        }
        document.body.append(menu);
    }
    function makeMenuLayer() {
        var _a;
        var div = "<div class=\"myeruda\">\n        <style>\n            .myeruda{\n                position: fixed;\n                z-index: 100000;\n                width:100%;\n                height: 100%;\n                top:0;\n                left:0;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n            .myeruda-menu{\n                width:80%;\n                box-shadow: 0 0 6px rgba(0,0,0,0.3);\n                border-radius: 5px;\n                background:rgba(255,255,255,0.98)\n            }\n            .myeruda-menu a{\n                display: block;\n                height: 6vh;\n                line-height: 6vh;\n                text-align: center;\n                color:#333;\n                border-bottom: 1px solid #f0f0f0;\n                text-decoration: none;\n                user-select: none;\n            }\n            .myeruda-menu a:last-child{\n                border-bottom:0\n            }\n        </style>\n        <div class=\"myeruda-menu\"></div>\n      </div>";
        var $links = document.createDocumentFragment();
        var $div = document.createElement('div');
        $div.innerHTML = div;
        var _loop_1 = function (m) {
            if (_opt.menu[m] === null) {
                return "continue";
            }
            var a = document.createElement('a');
            a.href = 'javascript:';
            a.innerText = _opt.menu[m].label;
            var handler = function (e) {
                _opt.menu[m].fn(e);
                a.removeEventListener('click', handler);
                $div.removeEventListener('click', hide);
            };
            var hide = function (e) {
                document.body.removeChild($div);
            };
            a.addEventListener('click', handler);
            $div.addEventListener('click', hide);
            $links.append(a);
        };
        for (var m in _opt.menu) {
            _loop_1(m);
        }
        // tslint:disable-next-line:no-unused-expression
        (_a = $div.querySelector('.myeruda-menu')) === null || _a === void 0 ? void 0 : _a.append($links);
        return $div;
    }
    function bindEvents() {
        var _this = this;
        window.addEventListener('touchstart', function (e) {
            return (e.touches.length === _opt.touches &&
                (function () {
                    clearInterval(tid);
                    touchstartTime = 0;
                    tid = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    touchstartTime += 100;
                                    if (!(touchstartTime === _opt.duration)) return [3 /*break*/, 3];
                                    devlog('触发myeruda');
                                    if (!!eruda) return [3 /*break*/, 2];
                                    return [4 /*yield*/, loadEruda()];
                                case 1:
                                    _a.sent();
                                    erudaInit();
                                    _a.label = 2;
                                case 2:
                                    eruda.show();
                                    el.style.display = el.style.display === 'none' ? '' : 'none';
                                    clearInterval(tid);
                                    touchstartTime = 0;
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                    return true;
                })());
        });
        window.addEventListener('touchend', function () {
            touchstartTime = 0;
            clearInterval(tid);
        });
    }
}
export default myeruda;
