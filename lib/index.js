"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function myeruda(opt) {
    var el;
    var touchstartTime = 0;
    var tid;
    var csl;
    var eruda;
    // tslint:disable-next-line: variable-name
    var _opt = {
        touches: 2,
        duration: 1000,
        onlyDev: true,
        onErrorShow: false
    };
    Object.assign(_opt, opt);
    if (!_opt.onlyDev || process.env.NODE_ENV === 'development') {
        init();
    }
    function init() {
        eruda = require('eruda');
        eruda.init();
        el = eruda._$el[0];
        el.style.display = 'none';
        csl = eruda.get('console');
        if (_opt.onErrorShow) {
            csl.on('error', function () {
                el.style.display = '';
            });
        }
        bindEvents();
    }
    function bindEvents() {
        window.addEventListener('touchstart', function (e) {
            return e.touches.length === _opt.touches && (function () {
                clearInterval(tid);
                touchstartTime = 0;
                tid = setInterval(function () {
                    touchstartTime += 100;
                    if (touchstartTime === _opt.duration) {
                        eruda.show();
                        el.style.display = el.style.display === 'none' ? '' : 'none';
                        clearInterval(tid);
                        touchstartTime = 0;
                    }
                }, 100);
                return true;
            })();
        });
        window.addEventListener('touchend', function (e) {
            touchstartTime = 0;
            clearInterval(tid);
        });
    }
}
exports.default = myeruda;
