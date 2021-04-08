class Animal {
    constructor(name) {
        this.name = name;
        this.colors = ['red', 'green', 'blue'];
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('yellow');

let dog2 = new Dog('奶茶', 1);
console.log(dog2);