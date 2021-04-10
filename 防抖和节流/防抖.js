// 简单版
function shallowDebounce(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait)
    }
}

// 防抖，支持取消
function debounce(func, wait, immeidate) {
    let timeout;
    let fn = function(...args) {
        let context = this;
        if (timeout) clearTimeout(timeout);
        if (immeidate) {
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait)
        }
    };
    fn.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return fn;
}