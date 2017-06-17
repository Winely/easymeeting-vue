/**
 * Created by dongg on 2017/4/24.
 */
export default {
  // api的根目录地址
  root: 'http://100.64.18.85:3000/api/',
  // root: '//123.206.123.213:3000/api/',
  // root: '//localhost:3000/api/',
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
  groupinfo(id, token){
    return `${this.root}team/${id}?token=${this.encodeToken(token)}`
  },
  meetinginfo(meetingid, token){
    return `${this.root}team/meeting/${meetingid}?token=${this.encodeToken(token)}`
  },
  newGroup(){
    return this.root + 'team'
  },
  newMeeting(groupId){
    return this.root + `team/${groupId}/meeting`
  },
  settinginfo1() {
    return this.root + 'user'
  },
  settinginfo2() {
    return this.root + 'userinfo'
  },
  getGroupMeetings(id, token){
    return this.root + 'team/' + id + '/meeting?token=' + this.encodeToken(token)
  },
  getUserMeetings(token){
    return this.root + 'user/' + 'meeting?token=' + this.encodeToken(token)
  },
  getTeamMember(id, token){
    return this.root + 'team/' + id + '/member?token=' + this.encodeToken(token)
  },
  inviteMember(groupid){
    return this.root + 'team/' + groupid + '/member'
  },
  getOneGroup(id, token){
    return this.root + 'team/' + id + '?token=' + this.encodeToken(token)
  },
  removeMember(teamID, memberID){
    return this.root + 'team/' + teamID + '/member/' + memberID
  }
}
