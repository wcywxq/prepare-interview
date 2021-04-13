# reactive 解析

创建一个 reactive 响应式对象时，将按照以下步骤来执行。

1. 调用 reactive 函数做一些处理
2. 调用 createReactiveObject 函数创建响应式对象，此处将创建 proxy。
3. 在 createReactiveObject 创建过程中将类型设置白名单，只有白名单中的类型可以 observed
4. 创建后将映射存储为 WeakMap，[原始对象 => 响应对象]，最后返回响应式对象

设置一个 reactive 响应式对象上的属性的值时，将按照以下步骤来执行。

1. 调用 createGetter 方法获取
2. 调用 createSetter 方法根据一些判断设置新值，如果值发生了改变，将调用 trigger 触发事件