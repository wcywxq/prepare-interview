// new 产生一个新对象
// 新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型
// 构造函数可能会显示返回

function ObjectFactory() {
    let Constructor = [].shift.call(arguments);
    let obj = {};
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person = ObjectFactory(Person, "zhangsan", 12)
console.log(person);