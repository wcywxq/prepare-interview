// 1. then 支持链式调用，即返回新的 Promise
// 2. 处理异步问题，先用 onResolvedCallbackList 和 onRejectedCallbackList 分别存储对应回调
// 3. 需判断 onFulfilled 和 onRejected 类型
// 4. 需要利用 setTimeout 模拟异步
// 5. 处理 Promise 和 resolve

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.status = PENDING;

    // success
    this.value = undefined;
    // error
    this.reason = undefined;
    // success callback
    this.onResolvedCallbackList = [];
    // error callback
    this.onRejectedCallbackList = [];
    // 成功回调
    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbackList.forEach(fn => fn());
      }
    };
    // 失败回调
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbackList.forEach(fn => fn());
      }
    };
    // 捕获异常
    // executor 执行发生错，则直接 reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  resolvePromise(promise, next, resolve, reject) {
    // 避免循环引用
    if (next === promise) {
      return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    // 是否被调用过(避免重复调用)
    let called;
    // 判定类型
    if ((next !== null && typeof next === "object") || typeof next === "function") {
      try {
        if (typeof next.then === "function") {
          const arg1 = next => {
            if (called) return;
            called = true;
            this.resolvePromise(promise, next, resolve, reject);
          };
          const arg2 = err => {
            if (called) return;
            called = true;
            reject(err);
          };
          // 改变作用域 context
          next.then.call(next, arg1, arg2);
        } else {
          resolve(next);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // next 以参数执行 promise
      resolve(next);
    }
  }

  then(onFulfilled, onRejected) {
    // 判断是否为函数，不是则被忽略
    onFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : function (val) {
            return val;
          };
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (err) {
            throw new Error(err);
          };

    // 每次调用 then 都将返回新的 Promise
    const promise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 异步调用
        const cb = () => {
          try {
            let next = onFulfilled(this.value);
            this.resolvePromise(promise, next, resolve, reject);
          } catch (err) {
            reject(err);
          }
        };
        setTimeout(cb, 0);
      }

      if (this.status === REJECTED) {
        const cb = () => {
          try {
            let next = onRejected(this.reason);
            this.resolvePromise(promise, next, resolve, reject);
          } catch (err) {
            reject(err);
          }
        };
        setTimeout(cb, 0);
      }

      //执行中
      if (this.status === PENDING) {
        const resolveCb = () => {
          const cb = () => {
            try {
              const next = onFulfilled(this.value);
              this.resolvePromise(promise, next, resolve, reject);
            } catch (err) {
              reject(err);
            }
          };
          setTimeout(cb, 0);
        };
        const rejectCb = () => {
          const cb = () => {
            try {
              const next = onFulfilled(this.reason);
              this.resolvePromise(promise, next, resolve, reject);
            } catch (err) {
              reject(err);
            }
          };
          setTimeout(cb, 0);
        };
        this.onResolvedCallbackList.push(resolveCb);
        this.onRejectedCallbackList.push(rejectCb);
      }
    });

    return promise;
  }

  catch(cb) {
    return this.then(null, cb);
  }

  // 静态方法
  static resolve(value) {
    if (value instanceof Promise) return value;
    return new Promise(resolve => resolve(value));
  }
  static reject(reason) {
    return new Promise((_, reject) => reject(reason));
  }
  static all(promiseList) {
    // 成功返回 list, 失败返回最先失败的结果
    let index = 0,
      result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0, len = promiseList.length; i < len; i++) {
        let item = promiseList[i];
        Promise.resolve(item).then(
          value => {
            index++;
            result[i] = value;
            if (index === len) {
              return resolve(result);
            }
          },
          err => reject(err)
        );
      }
    });
  }
  static race(promiseList) {
    // 那个跑的快，先返回哪个，无论成功 or 失败
    return new Promise((resolve, reject) => {
      for (let i = 0, len = promiseList.length; i < len; i++) {
        let item = promiseList[i];
        Promise.resolve(item).then(
          value => resolve(value),
          err => reject(err)
        );
      }
    });
  }
  static allSettled(promiseList) {
    // 不管成功 or 失败，会等所有实例都返回结果
    let result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0, len = promiseList.length; i < len; i++) {
        let item = promiseList[i];
        Promise.resolve(item).then(
          value => {
            result.push({ status: "fulfilled", value });
            if (result.length === len) {
              return resolve(result);
            }
          },
          err => {
            result.push({ status: "rejected", reason: err });
            if (result.length === len) {
              return reject(result);
            }
          }
        );
      }
    });
  }
  static any(promiseList) {
    // 全部失败才会失败，有一个成功则返回第一个成功的实例
    let index = 0;
    return new Promise((resolve, reject) => {
      if (promiseList.length === 0) return;
      for (let i = 0, len = promiseList.length; i < len; i++) {
        let item = promiseList[i];
        Promise.resolve(item).then(
          value => resolve(value),
          err => {
            index++;
            if (index === len) {
              return reject(new Error("All promises were rejected"));
            }
          }
        );
      }
    });
  }
}


// 4 -> 1 -> 5 -> 3 -> 2
console.log(4);
Promise.resolve()
  .then(() => {
    console.log(1);
    setTimeout(() => {
      console.log(3);
    }, 0);
  })
  .then(() => {
    console.log(2);
  });
setTimeout(() => {
  console.log(5);
}, 0);
