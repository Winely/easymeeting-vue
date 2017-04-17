# easymeeting-vue

> The fore-end project of EasyMeeting
## 现况
根据[关于vue项目多页面的配置](http://www.jianshu.com/p/acbff04b4096)实行了webpack的魔改以实现多页面。现在各个页面放在`src/pages`下，webpack会自动检测各js并生成目录。  

注意：
- `pages/`下的vue组件import不能自动补全后缀
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
