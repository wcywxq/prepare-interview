Function.toString.bind2 = function (ctx) {
  let _self = this;
  let args = [].slice.call(arguments, 1);
  function Fn() {}
  let f = function () {
    let fArgs = [].slice.call(arguments);
    return _self.apply(this instanceof Fn ? this : ctx, args.concat(fArgs));
  };

  Fn.prototype = this.prototype;
  f.prototype = new Fn();
  return f;
};
