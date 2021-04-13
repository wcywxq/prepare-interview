# computed 解析

创建一个 computed 时，将按照以下步骤执行

1. 调用 computed 方法
2. 做一些判断，如果是 readonly 将发出警告
3. 调用 ComputedRefImpl 类的构造函数，然后调用 effect， 之后调用 createReactiveEffect 做一些副作用的处理，在处理过程中将 getter 的值通过调度后做一些处理，处理过程中会触发 trigger 事件做 setter。