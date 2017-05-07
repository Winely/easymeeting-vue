<template>
  <div class="settingWrap">
    <header>
      <svg class="router-icon-s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.89 28.89">
        <title>icon</title>
        <g>
          <rect class="icon-s" x="10.29" y="1.73" width="8.35" height="8.35"
                transform="translate(8.41 -8.5) rotate(45)"></rect>
          <rect class="icon-s" x="18.81" y="10.25" width="8.35" height="8.35"
                transform="translate(16.93 -12.03) rotate(45)"></rect>
          <rect class="icon-s" x="10.25" y="18.81" width="8.35" height="8.35"
                transform="translate(20.48 -3.47) rotate(45)"></rect>
          <rect class="icon-s" x="1.73" y="10.29" width="8.35" height="8.35"
                transform="translate(11.96 0.06) rotate(45)"></rect>
        </g>
      </svg>
      <h2>个人设置</h2>
    </header>
    <div class="settings">
      <form class="edit_form" @submit.prevent="submit">
        <!--<p>{{$data}}</p>-->
        <div class="avatar">
          <thumbnail :seed="user.email" width="128" height="128"
                     alt="avatar" radius="64px"></thumbnail>
        </div>
        <div class="infobar info1">
          <div>
            <label class="infobar_label">点击修改邮箱及密码</label>
            <button type="button" @click.prevent="info1disabled = true;info2disabled=false"
                    class="edit_btn"
                    id="info1_btn"><i class="icon-pencil"></i></button>
          </div>

          <div>
            <label class="setting_label" for="email">电子邮箱</label>
            <input v-model="user.email" @input.prevent="checkEmail($event)" :class="{'edit-disabled':!info1disabled}"
                   :disabled="!info1disabled" :required="info1disabled" id="email" type="email"
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                   :value="user.email">
          </div>
          <div style="display: inline-block">
            <label class="setting_label" for="oldPassword">旧密码</label>
            <input v-model="oldpassword" :disabled="!info1disabled" :required="info1disabled" id="oldPassword"
                   type="password">
          </div>
          <div style="display: inline-block">
            <label class="setting_label" for="newPassword">新密码</label>
            <input v-model="user.password" :disabled="!info1disabled" :required="info1disabled" id="newPassword"
                   type="password"
                   @change.prevent="checkPasswords">
          </div>
          <div>
            <label class="setting_label" for="newPassword2">确认密码</label>
            <input id="newPassword2" :disabled="!info1disabled" :required="info1disabled" type="password"
                   @change.prevent="checkPasswords">
          </div>
        </div>
        <div class="infobar info2">
          <div>
            <label class="infobar_label">点击修改其他信息</label>
            <button type="button" @click.prevent="info2disabled = true;info1disabled=false"
                    class="edit_btn"
                    id="info2_btn"><i class="icon-pencil"></i></button>
          </div>
          <div>
            <label class="setting_label">昵称</label>
            <input v-model="user.username" :class="{'edit-disabled':!info2disabled}" name="nickName"
                   :disabled="!info2disabled" :required="info2disabled"
                   type="text" :value="user.username">
          </div>
          <div id="radio-form" class="radio-form">
            <label class="gender_label" for="radio-form">性别</label>
            <input v-model="user.gender" :disabled="!info2disabled" id="male" type="radio" name="gender" value="1"
                   :checked="user.gender===1">
            <label for="male"></label>
            <label for="male">男</label>
            <input v-model="user.gender" :disabled="!info2disabled" id="female" type="radio" name="gender" value="0"
                   :checked="user.gender===0">
            <label for="female"></label>
            <label class="gender-label" for="female">女</label>
          </div>
          <div style="">
            <label class="setting_label" for="description">个人简介</label>
            <textarea v-model="user.description" :class="{'edit-disabled':!info2disabled}"
                      :disabled="!info2disabled"
                      id="description" :value="user.description"></textarea>
          </div>
        </div>
        <button v-show="info1disabled||info2disabled" class="submit-button" type="submit">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  require('../assets/global.css')
  import thumbnail from './thumbnail'
  export default {
    data () {
      return {
        info1disabled: false,
        info2disabled: false,
        user: this.user,
        oldinfo: null,
        oldpassword: ''
      }
    },
    created () {
      if (sessionStorage.user) {
        var userinfomation = JSON.parse(sessionStorage.user)
        userinfomation['password'] = ''
        this.oldinfo = JSON.parse(sessionStorage.user)
        this.user = userinfomation
      }
    },
    methods: {
      checkPasswords: function () {
        var pass1 = document.getElementById('newPassword')
        var pass2 = document.getElementById('newPassword2')
        if (pass1.value !== pass2.value) {
          pass1.setCustomValidity('两次输入的密码不匹配')
        }
        else {
          pass1.setCustomValidity('')
        }
      },
      checkEmail: function (e) {
        if (e.target.validity.typeMismatch || e.target.validity.patternMismatch) {
          e.target.setCustomValidity('邮箱格式错误!')
        }
        else {
          e.target.setCustomValidity('')
          this.$http.get(urlconf.exist(this.user.email)).then(response => {
            e.target.setCustomValidity('该邮箱已被注册过！')
          }, response => {
          })
        }
      },
      logout () {
        this.user = null
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        location.href = '/login.html'
      },
      submit: function () {
        var newuserinfo = {
          "token": this.user.token,
          "username": this.user.username,
          "gender": this.user.gender,
          "description": this.user.description
        }
        if (!newuserinfo.username || newuserinfo.username === this.oldinfo.description) {
          delete newuserinfo.username
        }
        if (!newuserinfo.description || newuserinfo.description === this.oldinfo.description) {
          delete newuserinfo.description
        }
        if (!newuserinfo.description || newuserinfo.description === this.oldinfo.description) {
          delete newuserinfo.description
        }
        console.log(newuserinfo)
//        this.$http.post(urlconf.setting(), {email: this.user.email, password: this.user.password}).then((response) => {
//            if (response.status == 200) {
//              this.user.token = response.body.token
//              sessionStorage.user = JSON.stringify(this.user)
//              localStorage.user = JSON.stringify(this.user)
//            }
//          }, (response) => {
//          }
//        );
//        this.$http.post(urlconf.setting(), newuserinfo).then((response) => {
//            if (response.status == 200) {
//              this.user.token = response.body.user.token
//              this.user.username = response.body.user.username
//              this.user.gender = response.body.user.gender
//              this.user.description = response.body.user.description
//              sessionStorage.user = JSON.stringify(this.user)
//              localStorage.user = JSON.stringify(this.user)
//            }
//          }, (response) => {
//          }
//        );
      }
    },
    components: {
      thumbnail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  bg-color = rgba(255, 255, 255, 0.8)

  .settingWrap
    width 80%

  .infobar
    width 49%
    height 250px
    display inline-block
    vertical-align top

  .info1
    border-right 1px solid #e3e3e3

  .submit-button
    margin-left 100px

  .edit_btn
    display inline-block
    vertical-align top
    margin-top 10px
    text-align center
    height 24px
    width 24px
    border none
    border-radius 12px
    background-color theme-color
    color white
    font-size 12px
    cursor pointer
    transition .3s

  .edit_btn:hover
    box-shadow: 0 0 6px #aaa;

  .setting_label
    display inline-block
    vertical-align top
    line-height 30px
    margin 6px
    text-align right
    width 150px

  .infobar_label
    display inline-block
    line-height 30px
    margin 6px
    text-align left
    padding-left 85px
    width 170px
    vertical-align top

  input, textarea
    border-radius: 4px;
    height: 22px;
    width: 200px;
    margin: 6px;
    padding: 2px 6px;

  textarea
    width 200px
    height 100px

  .edit-disabled
    border-color transparent

  .gender_label
    display inline-block
    width 150px
    margin 6px
    margin-right 16px
    text-align right

  .router-icon-s
    width 30px
    height 30px
    .icon-s
      fill #a7c158

  header
    display flex
    align-items center
    padding-left 30px
    svg
      margin-right 20px
    button
      color #fff
      background #FFCA4C
      border-radius 9px
      border none
      font-size 16px
      width 125px
      height 34px
      line-height 34px
      margin-left 50px
      cursor pointer
      transition-duration .3s
      &:hover
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.16)

  .avatar
    width 100%
    height 130px
    display flex
    margin-bottom 35px
    flex-direction row
    justify-content center

  .radio-form
    display inline-block
    width 400px
    height 30px
    padding 6px 0
    vertical-align middle
    input
      position absolute
      left -999px
    input + label
      display inline-flex
      width 12px
      height 12px
      background transparent
      border solid 2px theme-color
      border-radius 8px
      transition-duration .3s
      &:hover
        background rgba(138, 181, 55, 0.4)
    input:checked + label
      background theme-color

</style>
