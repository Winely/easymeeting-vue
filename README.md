# easymeeting-vue

> The fore-end project of EasyMeeting
## 现况
根据[关于vue项目多页面的配置](http://www.jianshu.com/p/acbff04b4096)实行了webpack的魔改以实现多页面。现在各个页面放在`src/pages`下，webpack会自动检测各js并生成目录。  

注意：
- `pages/`下同一文件夹的vue和js文件名不建议相同
- `pages/`下的组件样式不建议用`scoped`属性
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 接口
### login 用户登录
```
/api/login?email=xxxxxxxxxxxxxx&password=xxxxxxxxxxxxxxxxxx
```
- type: GET  
- return:
```json
{
  "status": 0,
  "user": {
    "username": "王大锤",
    "email": "fewjiofa@rrjgeor.cn",
    "gender": true,
    "avatar": "dfaeiwofe.png",
    "description": "dfwahefneklmd",
    "token": "faweirhoiewnkdksl"
 }
}
```
- status
  - 0: 登录成功，并返回user信息
  - 1：密码错误
  - 2：账号不存在
- user
  - username：用户昵称
  - email：用户邮箱
  - gender：用户性别（true为男，false为女）
  - avatar：头像图片地址
  - description：用户自我介绍
  - token：登录状态密钥，浏览器本地保存
  
### userinfo 获取用户信息
```
  /api/userinfo?token=xxxxxxxxxxxxxxxxxxxxxxx
```
- type: GET  
- return:
```json
{
  "status": 0,
  "user": {
      "username": "王大锤",
      "email": "fewjiofa@rrjgeor.cn",
      "gender": true,
      "avatar": "dfaeiwofe.png",
      "description": "dfwahefneklmd",
      "token": "faweirhoiewnkdksl"
   }
}
```
- status
  - 0：token有效，返回用户信息
  - 1：token已失效，需要重新登录
  - 2：token是假的
  
### logout 注销登录
```
  /api/logout?token=xxxxxxxxxxxxxxxxxxxxxx
```
- type: GET  
- return:  
`true`: 注销完成
