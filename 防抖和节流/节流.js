// 触发高频事件，且 N 秒内只执行一次。
// 简单版：使用时间戳来实现，立即执行一次，然后每 N 秒执行一次。
function shallowThrottle(func, wait) {
    let context, args;
    let previous = 0;
    return function() {
        let now = +new Date(); // 时间戳
        context = this;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 最终版，支持取消
// 第三个参数
// leading => 立即执行一次，默认是 true
// trailing => 结束调用时是否还执行一次，默认是 true
function throttle(func, wait, leading = true, trailing = true) {
    let timeout, context, args, result;
    let previous = 0;
    let fn = function() {
        let now = +new Date();
        if (!previous && leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && trailing !== false) {
            timeout = setTimeout(function() {
                previous = leading === false ? 0 : +new Date();
                timeout = null;
                func.apply(context, args);
                if (!timeout) context = args = null;
            }, remaining)
        }
    }
    fn.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = nnull;
    }
    return fn;
}