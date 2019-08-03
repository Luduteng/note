## pwa 
> 一种渐进式webapp
 - pwa 作用  
     1. 实现离线缓存
 - 注意事项
     1. 只能使用https，或者localhost
     2. 默认要手动跳过等待
     3. 兼容性问题（ios，Android）
     4. 每次更改缓存名称 都需要删除上次的缓存
## 使用
- 需要mainfest 
- 基于serviceworker

## serviceworker
- 作用  
    1. 拦截用户请求
    2. 使用cacheApi 实现缓存
    3. 它开启了一个新的线程，线程里没有weindow 只能使用 self调用里面的方法
- self API  
    1. fetch 截取用户的所有请求
    2. install 安装
    3. activited
- 问题
    1. 需要手动激活（每次sw文件变化后 都会需要激活）
    2. 需要第二次才生效


## 案例
 - [百度pwa 解决方案](https://lavas.baidu.com/)

 ## 配置 manifest.json

 ```json
{
  "name":"珠峰课堂",    // 应用名称
  "short_name":"课堂", // 桌面应用的名称  ✓
  "display":"standalone", // fullScreen (standalone) minimal-ui browser ✓
  "start_url":"/",       // 打开时的网址  ✓
  "icons":[{
      "src":"/logo.png",
        "type":"image/png",
        "sizes":"144x144"
  }],           // 设置桌面图片 icon图标 修改图标需要重新添加到桌面icons:[{src,sizes,type}]
  "background_color":"#aaa", // 启动画面颜色
  "theme_color":"#aaa"       // 状态栏的颜色
}
 ```
- 兼容ios
```html
    <!--ios兼容-->
    <!--    图标icon-->
        <link rel="apple-touch-icon" href="apple-touch-icon-iphone.png"/>
    <!--    添加到主屏后的标题 和 short_name一致-->
        <meta name="apple-mobile-web-app-title" content="标题">
    <!--    隐藏safari地址栏 standalone模式下默认隐藏-->
        <meta name="apple-mobile-web-app-capable" content="yes" />
    <!--    设置状态栏颜色-->
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### 逻辑
1. 在install中，往内存中写入内容后 再 跳过等待
2. 在activate中，删除过去的缓存后再激活serviceworker
3. 再fetch中，先对需要缓存的内容进行判断是不是调用了接口，如果是 就用先把最新的内容缓存下来，如果接口报错，则需要从缓存中取内容。



### vue 设置pwa

1. 根据生成的service-worker 增加以下代码
```javascript
    workbox.routing.registerRoute(
    function(obj){ 
        // 包涵api的就缓存下来
        return obj.url.href.includes('/user')
    },
    workbox.strategies.staleWhileRevalidate()
);

```
2. 在dev 创建 service-worker.js
3. 配置文件增加 删除public manifest
```javascript
    module.exports = {
  pwa: {
    name: 'My App',
    themeColor: '#f2f2f2',
    msTileColor: '#aaaaa',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
       swSrc: 'dev/sw.js',
    }
  }
}
```
