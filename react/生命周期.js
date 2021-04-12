// 16.3 之前
// 组件创建阶段
// 1. 挂载前: componentWillMount (服务端渲染)
// 2. 渲染(到内存): render
// 3. 挂载结束: componentDidMount

// 组件运行阶段
//  componentWillReceiveProps 收到新的 porps，需要重渲染组件时使用
//  shouldComponentUpdate 是否更新 DOM(性能优化)
//  componentWillUpdate 更新之前被调用
//  render 数据是新的，页面是旧的(虚拟dom)
//  componentDidUpdate 更新完毕(每次重渲染都会进入)

// 组件销毁阶段
// componentWillUnMount

// 16.4 之后
// static getDerivedStateFromProps -> 替换 componentWillReveiveProps 
// 将父组件传递过来的 props 映射 到子组件的 state 上面，这样组件内部就不用再通过 this.props.xxx 获取属性值了，统一通过 this.state.xxx 获取
// 配合 componentDidUpdate，可覆盖 componentWillReveiveProps 所有用法
// static getSnapshotBeforeUpdate -> 代替 componentWillUpdate (在最终 render 前被调用)
