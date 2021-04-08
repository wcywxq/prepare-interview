// 结合原型链和借用构造函数
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

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('yellow');

let dog2 = new Dog('奶茶', 1);
console.log(dog2);

// 问题
// 调用了两次构造函数 new 和 Animal.call
