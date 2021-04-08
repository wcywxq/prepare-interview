function Animal() {
    this.colors = ['red', 'green', 'blue'];
    this.getColors = function() {
        return this.colors;
    }
}

function Dog() {
    Animal.call(this);
}

let dog1 = new Dog();
dog1.colors.push('white');
console.log(dog1.getColors());

let dog2 = new Dog();
console.log(dog2.getColors());

// 解决了原型链继承的 2 个问题: 引用类型共享问题、传参问题
// 问题
// 方法都定义在构造函数中，无法复用；每次创建子类实例都会重新创建一边方法，性能问题。