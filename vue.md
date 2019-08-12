
## vue 基础
- v-model .sync
- $parent 直接拿到父实例
```javascript
Vue.protoType.$dispatch = function(eventName, ...args) {
    let parent = this.$parent;
    white(parent) {
        parent.$emit(eventName, ...args);
        parent = parent.$parent;
    }
}
Vue.protoType.$broadcard = function(eventName, ...args) {
    cosnt broadcast = (children) => {
        children.forEach(child => {
        child.$emit(eventName, ...args);
        if (child.$children) {
            broadcast(child.$children)
        }
       })
    }
    broadcast(this.$children);
}
```
- $attrs 组件没有使用的属性 默认会被放在组件的最外层元素节点上 inheritAttrs: false
- v-bind='$attrs' 把没有使用的所有属性传递给组件
- $listeners 所有的事件 v-on='$listeners' 传递给子组件 this.$listeners.xx 可以调用

- 希望数据被共用 不希望传递 可以使用 Provide 可以是一个函数 
```javascript
    provide () {
        return {
            parent: this // 最外层父组件把自己穿进去
        }
    }
    // 子组件
    inject: ['parent']
```
- 父组件拿到子组件数据 ref 自由在循环的时候 $refs才能拿到 数组
- eventBus $on $emit
- render函数  函数式组件

组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：

>props：提供所有 prop 的对象  
children: VNode 子节点的数组  
slots: 一个函数，返回了包含所有插槽的对象  
scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。  
data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件  
parent：对父组件的引用  
listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。  
injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。  
[函数式组件地址](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)    

```javascript
export default {
    functional: true
    render(h, context) { // 通过context 来获取一下属性
        return <div on-click='handleClick'>{this.$slots.default}</div>
    },
    methods: {
        render(h) {
            return <li>
                <input on-input={()=> this.handleInput} />
            </li>
        }
    }
}
    
```  
- e.currentTarget 和 e.target 区别


- `<template v-slot:xxx='{a, item}'> </template> `xxx 是名字 通过`<slot name='xxx'></slot>`获取到分发的内容
 
- jwt 认证 json web token
- token 验证
- axios 请求拦截
> 1. 登录 返回token  
> 2. 进入页面的时候校验是否登录
> 3. 没有登录则跳转登录
> 4. 登陆过如果刷新页面要刷新token
> 5. meta 鉴权 to.matched 匹配的路由数组
> 6. 白名单 whiteList.includes 直接next
```javascript 
class Request{
    constructor() {
        this.baseUrl =  process.env.NODE_ENV === 'production' ? 'localhose:3000': '/';
        this.timeout = 2000;
    }
    request(config) {
        const instance = axios.create({
            baseUrl: this.baseUrl,
            timeout: this.timeout
        });
        // 两个拦截器都会走 
        instance.interceptors.request.use((config) => {
            return config
        })
        instance.interceptors.request.use((config) => {
            return config
        })
        return instance(config)
    }
}
export default new Request()
```


















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

### vue 插件封装
```javascript
    import infoTable from './src/info-table'
    let _vue;
    infoTable.install = function(Vue, options) {
        if (_vue) {
            Vue.component('info-table', infoTable);
        }
        Vue.mixin({
            beforeCreate() {
                // 先遍历父组件 再遍历子组件 加入公共数据
            }
        })
    }
    export default infoTable;

```
### vue router

### vuex

```javascript
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex) // 混入$store
    export default new Vuex{
        state: {
            count: 0
        },
        mutations: { // commit
            add(state, count) { // 第一个参数state 第二个参数传进来的参数
                state.count += count;
            }
        },
        getters: { // 类似于计算属性 当依赖变化 muti就会变化
            muti(state) {
                return state.count == 3 ? '等于3' : '不等于3';
            }
        },
        actions: { // dispatch -> commit 用来发送异步请求
            addNum({commit}, count) { // 第一个参数 context 第二个payload
                setTimeout(() => { 
                    commit('add', 3);
                }, 10000)
            }
        }
    }
```

```javascript
// 组件中 直接使用
<template>
     {{this.$store.state.count}}
     {{this.$store.getters.muti}}
</template>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'; // mapState 是一个函数
    let vState = mapState(['count']);//  返回 只有count 的一个函数 对象 放在computed使用
     // 改变状态
    export default {
        computed: {
            ...mapGetters([muti]),
            ...vState,
            ...mapState({a: s=>s.a.a, b: bVal}) // 取状态中对象的值 s 为vuex state
            // ...mapState({a: s=>s.a.a, bVal: b}) //重命名
        },
        methods: {
            ...mapActions(['add']), // 把 dispath的 异步方法映射到 方法中 也可以重命名
            ...mapMutations(['add']), // 把vuex 中 commit add 方法映射到方法中
            // ...mapMutations({addfn: add}), // 把重命名
            add() {
                this.$store.commit('add', 2) // 状态+2
            }
        }
    }
```
vuex 中使用模块
modules 每一个模块有自己的 state action mutations 通过namespace 来解决直接dispatch 的问题
解决办法 
```

```
1. mapActions['product', ['add']] // add is procuction namespace action
2. let {mapActions, mapState,...} = createNamespaceHelps('product') // create a product namespace's mapAction that is only contains product actions
3. this.$store.dispatch('product/'+add);

#### note

1. 通过action 触发commit 不要直接commit
2. vuex 数据持久化 插件 vuex-persist
3. lodash 包括 cloneDeep方法 实现深拷贝
4. store.replaceState() 替换store 中的状态
5. store.subscribe((mutation, state) => {

})
6. import logger from 'vuex/dist/logger' // vuex 自带的中间件 不能喝 persist 通用
7. vuex 中的mutations 和 actions getters 都会被合并到 跟store上去 如果多个模块定义 会被放到数组中 并且调用的 时候回全部执行
8. reduce 取值 

```

```
### vuex 实现原理
通过vue实例的 data对象会触发更新 来实现响应
forEach 方法来实现对象遍历
重写commit 和 dispatch 避免this指针改变 
in install function first arg is vue instance and second arg is user's options

use vue's mixin to add $store to every vue instance by beforeCreate hook in which 
you can judge if running instance is root instance. if it is root instance, you can get vue root instance options by this.$options and get store instance and save it;if
it is  not root instance you can get $store by its $parent' $store

## 单元测试
- TDD 测试驱动
- BDD 行为驱动
- 测试工具
 1. mocha 测试框架 用例跑在框架上
 2. chai 断言库 跑的对不对 jest // chaijs.com

- 默认测试文件夹 tests/unit/*.spec.js
- 给用例分类 describe

```javascript
import {expect} from 'chai'
describe('专门测试工具', () => { 
    it('xxxx', () => {
    // to.be xxxx
    // to.be.deep.equal 标示两个对象是否相等
    expect(fn1()).to.be.deep.equal({});
    });
    it('相等关系', () => {
        expect(1+1).to.be.equal(2);
        expect([1,2,3]).to.be.length(3);
    })
    it('包含', () => {
        expect('zfpx').to.be.contain('zf');
        expect('zfpx').to.be.match(/zf/);
    })
    it('大于 小于', () => {
        expect(5).to.be.greaterThan(3);
        expect(3).to.be.lessThan(5);
        expect(3).to.be.not.greaterThan(10);
    })
})

it('xxx',() => {
    expect(fn2()).to.be.deep.equal('name=sss');
})
```
- 测试工具 ‘@/vue/test-utils’ 官网api
- 自己装macha  cli 自带
- sinon mock 函数 看文档
- moxios 模拟接口 看文档
```javascript
import {mount, shallowMount} from '@/vue/test-utils'
import {expect} from 'chai';
import sinon from 'sinon';
import moxios from 'moxios';
// 测试组件
descript('测试组件', () => {
    it('xx', () => {
        let Constructor = Vue.extend('xxx');// 生产构造函数
        let vm = new Constructor({
            propsData: {msg: 'hello'}
        }).$mount(); // 挂载组件 产生实例
    // mocha 继承了jsdom
        let content = vm.$el.querySelector('h1').innerHTML;
        expect(content).to.be.contain('hello')   
    })
    it('', () => {
        let wrapper = mount('xxx', {
            propsData: {
                msg: 'hello' // wrapper.setProps({})
            }
        });
        wrapper.setProps({msg: 'hello'});
        expect(wrapper.find('h1').text()).to.be.contain('hello');
    })
})
descript('', () => {
    it('点击按钮后是否加一', () => {
        let wrapper = mount(Count);
        wrapper.find('button').trigger('click');
        expect(wrapper.find('#count').text()).to.be.equal(11)
    })
})
descript('', () => {
    it('子组件触发加一', () => {
        let wrapper = shallowMount(Parent); // 只挂载父组件 忽略子组件
        wrappre.setData({isShow: true});
        expect(wrapper.find('#content').exists()).to.be.false;
        wrapper.find(Child).vm.$emit('show');
        expect(wrapper.find('#content').exists()).to.be.true;
    })
})
descript('', () => {
    it('子组件触发加一', () => {
        let wrapper = shallowMount(Parent); // 只挂载父组件 忽略子组件
        wrappre.setData({isShow: true});
        expect(wrapper.find('#content').exists()).to.be.false;
        wrapper.find(Child).vm.$emit('show');
        expect(wrapper.find('#content').exists()).to.be.true;
    })
})
descript('', () => {
    it('测试子组件接收一个函数 点击按钮调用这个函数', () => {
        let callback = sinon.spy();
        let wrapper = shallowMount(Child, {
            propsData: {fn: callback}
        })
        wrapper.find('button').trigger('click');
        expect(callback.getCall(0).args[0]).to.be.equal('333'); // 测试回调中的第一个参数的值
        expect(callback.callCount).to.be.equal(2);
    })
})
// mocha + axios 测试异步有两个方案 1. 返回promise 2. 调用done
descript('', () => {
     beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install()
    })
 
    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })
    it('测试异步获取数据', (done) => {
        let wrapper = shallowMount(GetData);
        moxios.stubRequest('/user', {
            status: 200,
            response: {user: 'af'}
        });
        moxios.wait(() => {
            expect(wrapper.text()).to.be.match(/zfpx/);
            done()
        })
      //  return new Promise
    })
})
```
文档 vue test util
- jest 单元测试 jesmine
- 默认集成 chai 断言
- 默认继承 sinon 函数
- 默认继承 moxios 接口

```javascript
import {mount, shallowMount} from '@/vue/test-utils'
    describe('hello', () => {
        it('相等', () => {
            expect(1+1).toBe(2);
            expect({name: 'zfpx'}).toEqual({name: 'zfpx'});
            expect([1,2,3]).toHaveLength(3);
        })
        it('大于 小于', () => {
            expect(3).toBeGreater(2);
            expect(2).toBeLessThan(3);
            expect([1,2,3]).toHaveLength(3);
        })
        it('包含', () => {
            expect('zfpx').toContain('zf');
        })
        // 在任意目录下 创建__mocks__文件夹  创建axios.js
        // export default {
            // get:() => {
                // return Promise.resolve({data: {user: 'zfpx'}})
            //}
        //}
        jest.mock('axios') // 和文件名一致
        it('测试mock axios', () => { 
            let wrappre = shallowMount(GetData);
            return Vue.nextTick().then(()=>{
                expect(wrapper.text()).toMatch(/zfpx/)
            })
        })
    })
```
- 测试vuex
1. 测试ui 2. 测试功能vuex流程能否跑通
```javascript
import {shallowMount, createLocalVue} from '@vue/test-utils'; // 
import Vue from 'vue';
import Vuex from 'Vuex';
    let localVue = createLocalVue(); // 局部的vue 不会影响全局

localVue.use(Vuex);
describe('测试vuex 能否在页面中使用', () => {
    let state;
    let store;
    let action;
    let callback = jest.fn(); // 可以测试函数的参数只能测试函数有没有被调用
    beforeEach(()=>{
        state = {username: '234'} // 每个用例都可以初始化
        store = new Vuex.Store({
            state
        });
        actions = {
            set_username: callback
        }
    })
    it('state能否正常显示在页面中', ()=>{
        let wrapper = shallowMount(vueComponent,{
            localVue, // 给他vue 不会影响其他用例的vue
            store // 给他store
        })
        expect(wrapper.text()).toContain('jw');
    })
    it('state能否正常显示在页面中', ()=>{
        let wrapper = shallowMount(vueComponent,{
            localVue, // 给他vue 不会影响其他用例的vue
            store, // 给他store
        })
        wrapper.find('button').trigger('click');
      //  expect(callback.mock.calls[]).toEqual('xxx') 取调用时的参数
        expect(callback).toHaveBeenCall(); // 期待构造函数被调用了
      //  expect(callback).not.toHaveBeenCall(); // 期待构造函数被调用了
    })
})

```
- 直接测试vuex store中的方法和属性
```javascript
import Vuex from 'vuex';
import config from '@/store'; // 导入配置文件
import {createLocalVue} from '@vue/test-utils';

let localVue = createLocalVue();

localVue.use(Vuex);

describe('', () => {
    beforeEach(() => {
        store = new Vuex.Store(config);
    })
    it('state能否显示在页面中', () => {
        expect(store.state.username).toBe('afpx')
    })
    it('测试派发动作', () => {
        expect(store.state.username).toBe('afpx')；
        store.dispatch('set_username', 'newName');
        expect(store.state.name).toBe('newName');
    })
    it('测试异步代码', () => {
        expect(store.state.username).toBe('afpx')；
        jest.useFakeTimers(); // 创建一个模拟的定时器会把异步代码变成立刻返回
        store.dispatch('set_username', 'newName'); // 把这个数据立即返回
        jest.runAllTimers(); // 默认不会走 需要调用runAll
        expect(store.state.name).toBe('newName');
        jest.useRealTimers();
    })
})

```

###  服务器端渲染 nuxt node 和 webpack 进行封装的基于vue的ssr
- 所有的请求在服务端进行
- ssr 占用cpu 和 内存
- 利于seo
- 只支持beforeCreate 和 created
- 提高首页加载速度
- 浏览器api无法使用

打包两个包 1. 服务端入口 2. 客户端入口

安装服务


// webpack webpack-cli webpack-dev-server babel-loader @babel/preset-env @babel/core vue-style-loader
// css-loader  vue-loader vue-template-compiler html-webpack-plugin webpack-merge -D

```
yarn add koa koa-router koa-static
yarn add vue vue-router vuex vue-server-renderer

```
```javascript
const koa = new Koa();
const router = new Router();
const VueserverRender = require('vue-server-renderer');

const Vue = require('vue');
const vm = new Vue({
    data(){return{msg:'hello'}},
    template: `<div>{{msg}}</div>`
})
let template = fs.readFileSync('./template.html')
let render = VueServerRender.createRender({
    template
});
router.get('/',async ctx => {
    ctx.body = await render.renderToString(vm); // 没有html结构
})
//  服务渲染的 路由跳转规则
```
- 创建vue模板
```html
<>
```


