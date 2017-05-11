/**
 * Created by dongg on 2017/4/24.
 */
export default {
  // api的根目录地址
  root: '//123.206.123.213:3000/api/',
  encodeToken (token) {
    return token.replace(/\+/g, '%2B')
  },

  // 各种请求的api统一为函数，返回字符串
  // get方法则带参
  exist(email){
    return this.root + 'user/exists?email=' + email
  },
  signup () {
    return this.root + 'user'
  },
  login () {
    return this.root + 'session'
  },
  userinfo(token) {
    return this.root + 'user?token=' + this.encodeToken(token)
  },
  group(token) {
    return this.root + 'team?token=' + this.encodeToken(token)
  },
  settinginfo1() {
    return this.root + 'user'
  },
  settinginfo2() {
    return this.root + 'userinfo'
  },
  getMeetings(id, token){
    return this.root + 'team/' + id + '/meeting?token=' + this.encodeToken(token)
  },
  getTeamMember(id, token){
    return this.root + 'team/' + id + '/member?token=' + this.encodeToken(token)
  },
  inviteMember(id){
    return this.root + 'team/' + id + '/member'
  }
}
