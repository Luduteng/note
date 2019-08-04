## vue骨架屏
1. 使用webpack插件vue-skeleton-webpack-plugin

## vue 
- 自定义指令
1.  全局指令
```javascript 
    Vue.directive(el, bindings, vnode){
        // 在这里 是 bind 和 update 执行
    }
```
参数三个值， 第一个元素，第二个对象 包含指令信息，第三个虚拟节点 包含context对象 
2.  局部指令
```javascript
{
    directives: {
        ‘name’: {
            bind(el, bindings, vnode) {
                // 未插入dom 这里可以改变元素的样式属性
            },
            inserted() {
                // 已经插入到dom 在这里执行input 的 获取焦点 这里可以进行dom 操作
            },
            update() {
                // 当指令绑定的数据变化了 就会触发
            }
        }
    }
}
```
## 使用 v-name

## 过滤器
```javascript
    Vue.filter('toUpper', function(value, params){ // 第一个是值 第二个是过滤器的参数
        return // 返回结果
    })
```
```javascript
    computed: { //  有缓存 methods 没有
    // 同步的  watch 可以异步
        name: {
            get() {

            },
            set(val) {
                // 可以做其他的事情 vuex
            }
        }
    }
```
### 属性继承
- 当父组件给子组件传参时 没有通过props 取的属性 会被放到this.$attrs 并且会被绑定到父元素的跟元素上

### 函数式组件
- context 对象 属性
 1. props 属性对象
 2. slots().default 分发
 不能定义方法属性 没有计算属性和watch
```javascript
    export default {
        functional: true,
        render(h, context) { // context 上下文
            return 
        }
    }
```

### 日历组件封装
