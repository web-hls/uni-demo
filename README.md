### 1. 修复刷新无数据问题
1. 使用cookie存储 懒得封装直接用插件
yarn add cookie

2. 在登录页面登录成功时吧token和userData添加进去

3. 通过路由守护判断是否有token，有就是把token和userData赋值到vuex里面（正常应该发生请求验证token是否正确暂时没写）

### 2. 添加了一个公共配置 config/env.js
里面配置了请求地址和图片地址（但是manifest.json里面的代理地址也是需要改，其他的地址在env里面改就可以了）

### 3. 使用vuex把我的和修改信息页面数据匹配