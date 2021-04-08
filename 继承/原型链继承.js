function Animal() {
    this.colors = ['black', 'white'];
}

Animal.prototype.getColor = function() {
    return this.colors;
}

function Dog() {}
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push('yellow');
let dog2 = new Dog();
console.log(dog2.colors);

// 问题
// 原型包含的引用类型的属性将被所有实例共享
// 子类实例化时不能给父类构造函数传递参数