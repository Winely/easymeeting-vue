/**
 * Created by dongg on 2017/4/24.
 */
import Resource from 'vue-resource'
import Vue from 'vue'

Vue.use(Resource)
Vue.http.option={
  root: '/api/'
}
export default {
  // api的根目录地址
  root: '/api/',

  // 各种请求的api统一为函数，返回字符串
  // get方法则带参
  exist(email){
    return this.root + 'exists?email=' + email
  },
  signup () {
    return this.root + 'user'
  },
  login () {
    return this.root + 'session'
  },
  userinfo(token) {
    return this.root + 'user?token=' + token
  },
  group(token) {
    return this.root+'group?token='+token
  }
}
