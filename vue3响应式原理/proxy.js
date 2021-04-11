/**
 * 什么是 proxy?
 */
// Proxy 对象用于定义基本操作的自定义行为(属性查找、赋值、枚举、函数调用等)。对象代理模式
// target: 目标对象
// handler: 行为
// const proxy = new Proxy(target, handler)

/**
 * 为何用 proxy? proxy 利弊
 */
// vue3.0 带来了基于 Proxy 的观察者模式的实现，提供了全范围响应式的能力，消除了 vue2.x 基于 Object.defineProperty 存在的局限性
// 其中，局限性包含: 1. 对属性添加、删除动作的检测 2. 对数组基于下标的修改、对于数组长度修改的检测 3. 对于 Map、Set、WeakMap、WeakSet 支持
// WeakMap, WeakSet(好处: 弱饮用，避免内存泄漏，不会阻止垃圾回收器回收他所饮用的 key，必须非空对象作为 key)

/**
 * Proxt 中 handler 对象基本用法
 */
/*
// has 捕获器(拦截判断target对象是否含有属性propKey的操作)
const handler = {
    has(target, propKey) {
        return propKey in target
    }
}
const proxy = new Proxy(target, handler)

// get 捕获器(拦截对象属性的读取)
const handler = {
    get(target, propKey) {
        return propKey in target ? target[propKey] : "no";
    }
}
const proxy = new Proxy({}, handler)
proxy.apple = "苹果";
proxy.banana = "香蕉";
console.log(proxy.apple, proxy.banana);
console.log('watermalon' in proxy, proxy.watermalon)

// set 捕获器(拦截对象的属性赋值操作)
let validator = {
    set(obj, prop, value, receiver) {
        if (prop === "age") {
            if (!Number.isInteger(value)) {
                throw new TypeError("The age is not an integer")
            }
            if (value > 200) {
                throw new RangeError("The age seems invalid")
            }
        }
        obj[prop] = value;
        return true;
    }
};
const proxy = new Proxy({}, validator);
proxy.age = 100;
console.log(proxy.age) // 100
proxy.age = "young"; // Error
proxy.age = 300; // Error

// deleteProperty 捕获器(拦截删除target对象的propKey属性的操作)
const foot = { apple: '苹果' , banana:'香蕉'  }
const proxy = new Proxy(foot, {
  deleteProperty(target, prop) {
    console.log('当前删除水果 :', target[prop])
    return delete target[prop]
  }
});
delete proxy.apple;
console.log(foot);
运行结果：
    '当前删除水果 : 苹果'
    {  banana:'香蕉'  }

// ownKeys 捕获器(拦截获取键值的操作)
let obj = { a: 10, [Symbol.for('foo')]: 2 };
Object.defineProperty(obj, "c", {
    value: 3,
    enumerable: false
})
let proxy = new Proxy(obj, {
    ownKeys(target) {
        return [...Reflect.ownKeys(target), "b", Symbol.for("bar")]
    } 
})
const keys = Object.keys(proxy); // ["a"]
for (let prop in proxy) {
    console.log("prop-", prop)
}

const ownNames = Object.getOwnPropertyNames(proxy); // ['a', 'c', 'b']
const ownSymbols = Object.getOwnPropertySymbols(proxy); // [Symbol(foo), Symbol(bar)]
const ownKeys = Reflect.ownKeys(proxy); // ['a', 'c', Symbol(foo), 'b', Symbol(bar)]
*/