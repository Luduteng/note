### commonjs 中的模块 
1. 早期使用单例模式 不能保证变量唯一性 iffe
2. commonjs 模块 require 一个文件就是一个模块
3. umd 统一模块化 es6 模块化

### node 事件环
1. 调用栈 -》 微任务 -》 宏认为（只执行一个）
2. 宏任务包括 1. timer(setTimeout) 2. io 3. check（setImmediate） setTimeout 和 setImmediate 不一定谁先执行，跟电脑性能有关系
3. 微任务 1.nextTick > 2.promiss.then
### node 核心模块
- 文件查找
当`require(./b)` 时 会先看当前目录下的文件，如果不存在找文件夹， 找到后找Pakage.json 中的main函数中的入口文件；
- 第三方目录查找
当`require('xx')`时 会在nodemodule 中找对应文件夹 找不到往上找如果找不到 报错;
- path
`resolve` 解析出来的是一个绝对路径
```javascript
path.resolve('name'); // 解析出来的是 执行命令的位置下的name
path.dirname(xxx); // 解析xxx的父目录
path.extname('xxx.js') // js
path.basename("xxx.js",'.js'); // xxx
```
- `buffer` 可以和字符串互转 用来存储二进制数据
1. 编码
    1. 最常用的是utf8 一个汉字3个自己
    2. ascii编码 一个字节 表示一个字母
    3. gb2312 多了几万字 中国人用 没有国际化
    4. gb18030 没推行
    5. utf8 国际标准
2. 进制转化 0b 2进制 0x 16进制 0 8进制
    1. `parseInt('111', 2)` 把11111转化为10进制 把几进制转化为10进制
    2. '02222'.toString(10) 把8进制转化为10进制
3. base64   base64 就是把二进制 每6个放在一起 然后转化为十进制 在上边的字符串中取值
    
    1. 比原来的大小多1/3；
    2. base64 6 * 4 = 3个字节8个位；把字节分成4段 每段6位
    把6位 转化为 10进制在 字符串
    'abcdefghijklmnABCDEFGHIJKLMN0123456789+/'
    中取值后 得到base64
    base64 就是把二进制 每6个放在一起 然后转化为十进制 在上边的字符串中取值
- events 发布订阅
    `let Event = require(events)`;
    Event.on 有一个 newListener 每次绑定 触发一次 参数为绑定的事件名称
    .emit
    .off
    .once

    小数转化为2进制 乘2 取整



