# JIAN-JIAN-se

## 服务端开发指南

### 1. 尽量使用``ctx.paramData``中的数据
主要的数据在``routers/index.js``中的全局中间件``initParam``中已经创建，如果路由中产生了什么参数，或者中间件中有什么参数需要保存的，尽量存储在``ctx.paramData``之中， 不要污染ctx。

### 2. 使用``SoftError``来进行流程的中断
如果产生了什么需要中断处理立即返回的请求，使用抛出软异常的方法来进行操作。比如
```js
async function isLogin(ctx, next) {
  if (ctx.paramData.session.user === undefined) {
    throw new SoftError(Status.NOT_AUTHORIZED, '未登录')
  }
  return next()
}
```

### 3.使用``sendData``和``handleError``而不是直接写``ctx.body``
发送数据的时候，请使用封装好的数据``sendData``。*注意：如果是因为用户产生的错误，也请使用sendData发送数据，使用状态码进行区分*

## 调试相关
1. 建议安装``vscode``，使用如下debug配置
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Port",
      "address": "localhost",
      "port": 5858,
      "restart": true,
      "timeout": 100000
    }
  ]
}
```
同时安装``nodemen``，这个已经在``dev``依赖中了
> npm install --only=dev
通过``npm``启动``nodemen``
> npm run dev
然后``vscode``开启名为``Attach to Port``的调试，连接到``nodemen``

