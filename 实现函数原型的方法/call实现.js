Function.toString.call2 = function(ctx) {
    let ctx = ctx || window;
    ctx.fn = this;
    let args = [...arguments].slice(1);
    let result = ctx.fn(args);
    delete ctx.fn;
    return result;
}