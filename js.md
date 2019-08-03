1. setPrototypeOf 原理
```javascript
  Object.setPrototype(a, b) // 等价于
  a.__proto__ = b
```
2. new 原理
```javascript
function myNew (con, ...args) {
    let obj = Object.create(con.protoType, {constructor:{
        value: con
    }});
    let r = con.apply(obj, args);
    if (typeof r === 'object') {
        return r
    }
    return obj
}
```
3. bind 原理
```javascript
    function Bind1(context, ...bindArgs) {
        let fn = this;
        function result(...args) {
            fn.apply(this instance result ? this : context, args.concat(bindArgs));
        }
        result.prototype = Object.create(fn.prototype, {constructor: {
            value: fn
        }});
    }
```
4. 原生继承 和 class 继承
 - 原生继承
 > 主要是通过apply继承实例属性，通过object.create继承原型属性
 没有继承静态属性和静态方法  

 静态属性继承 `subClass.__proto__ = superClass`
```javascript

function Parent(name) {
    this.name = name;
}
Parent.prototype.say = function() {
    console.log('说话');
}
function Son(...args){
    Parent.apply(this,args);
}
Son.prototype = Object.create(Parent.prototype, {constructor:{
    value: Son
}});

console.log(a = new Son('haha'));
a.say();
console.log('constructor', a.constructor)
```
class 实现 类不能当做函数调用 类中的函数拿出来取到的this是undefine
子类不写构造函数 可以自动传参给父类
子类写了父类 则必须调用super（）
```

```
5. 深拷贝
6. Object.create 原理
```javascript
    Object.create = function（obj）{
        function Fn(){};
        Fn.protoType = obj;
        return new Fn;
    }

```
7. instanceof 原理
```javascript
function instanceof1 (a,b) {
    let proto = a.__proto__;
    let protoType = b.protoType;
    while(true) {
        if (proto === null) {
            return false;
        }
        if (proto === protoType) {
            return true;
        }
        proto = proto.__proto__
    }
}
```
8. 深拷贝
```javascript

function deepClone(obj, cache = new WeakMap()) {
    if (obj === null) return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (typeof obj !== 'object') return obj;
    if (cache.has(obj)) return cache.get(obj);
    let instance = new Object.constructor;
    cache.set(obj,instance);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
           instance[key] = deepClone(obj[key], cache);
        }
    } 
    return obj;
}
 
```
9. call apply
```javascript
    function call() {
    let context = [].slice.shift(arguments,0,1);
    context.fn = this;
    let args = []
    for(let i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]")
    }
    let r = eval("context.fn("+args+")");
    delete context.fn;
    return r;
}
```