// 为了解决组合继承调用2次构造函数的问题
// 解决方案
// 不直接调用父类构造函数给子类原型赋值，而通过创建空函数 F 获取父类原型的副本

function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
}

Animal.prototype.getName = function() {
    return this.name;
}

function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
}

// Dog.prototype = new Animal();
// Dog.prototype.constructor = Dog;

// 最简单的替换
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('yellow');

let dog2 = new Dog('奶茶', 1);
console.log(dog2);