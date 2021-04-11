Function.toString.apply2 = function(ctx) {
    let ctx = ctx || window;
    ctx.fn = this;
    let args = [...arguments][1];
    if (!args) {
        return ctx.fn();
    }
    let result = ctx.fn(args);
    delete ctx.fn;
    return result;
}