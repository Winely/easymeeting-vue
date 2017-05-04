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
    <div class="container settings">
      <form class="edit_form" @submit.prevent="submit">
        <p>{{$data}}</p>
        <div class="form-group">
          <label class="setting_label">头像</label>
          <thumbnail :seed="user.email" class="avatar" width="128" height="128"
                     alt="avatar" radius="64px"></thumbnail>

        </div>
        <div class="form-group">
          <label class="setting_label">昵称</label>
          <input v-model="user.username" :class="{'edit-disabled':!nickName_disabled}" name="nickName"
                 :disabled="!nickName_disabled"
                 type="text" :value="user.username">
          <button type="button" v-show="!nickName_disabled" @click.prevent="nickName_disabled = true" class="edit_btn"
                  id="username_btn"><i class="icon-pencil"></i></button>
        </div>
        <div class="form-group">
          <label class="setting_label" for="newPassword">新密码</label>
          <input v-model="user.password" id="newPassword" type="password" @change.prevent="checkPasswords">
        </div>
        <div>
          <label class="setting_label" for="newPassword2">确认密码</label>
          <input id="newPassword2" type="password" @change.prevent="checkPasswords">
        </div>
        <div id="radio-form" class="radio-form">
          <label class="gender_label" for="radio-form">性别</label>
          <input v-model="user.gender" id="male" type="radio" name="gender" value="1" :checked="user.gender===1">
          <label for="male"></label>
          <label for="male">男</label>
          <input v-model="user.gender" id="female" type="radio" name="gender" value="0" :checked="user.gender===0">
          <label for="female"></label>
          <label class="gender-label" for="female">女</label>
        </div>
        <div>
          <label class="setting_label" for="email" @input.prevent="checkEmail($event)">电子邮箱</label>
          <input v-model="user.email" :class="{'edit-disabled':!email_disabled}" :disabled="!email_disabled" id="email"
                 type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                 :value="user.email">
          <button type="button" v-show="!email_disabled" @click.prevent="email_disabled = true" class="edit_btn"
                  id="email_btn"><i
            class="icon-pencil"></i>
          </button>
        </div>
        <div>
          <label class="setting_label" for="description">个人简介</label>
          <textarea :class="{'edit-disabled':!description_disabled}" :disabled="!description_disabled"
                    id="description" :value="user.description"></textarea>
          <button type="button" v-show="!description_disabled" @click.prevent="description_disabled = true"
                  class="edit_btn"
                  id="description_btn"><i class="icon-pencil"></i></button>
        </div>
        <button class="submit-button" type="submit">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  require('../assets/global.css')
  import thumbnail from './thumbnail'
  export default {
//    props: ['user'],
    data () {
      return {
        email_disabled: false,
        nickName_disabled: false,
        description_disabled: false,
        user: this.user
      }
    },
    created () {
      if (sessionStorage.user) {
        var userinfomation = JSON.parse(sessionStorage.user)
        userinfomation['password'] = ''
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
        this.$http.post(urlconf.setting(this.user.token), this.user).then((response) => {
          if (response.status == 201) {
//            修改信息成功，重新登录
            this.$http.post(urlconf.login(), {email: user.email, password: user.password}).then(resp => {
              this.user = resp.body.user
              sessionStorage.user = JSON.stringify(this.user)
              localStorage.user = JSON.stringify({
                username: this.user.username,
                token: this.user.token
              })
              location.href = '/home.html'
            }, resp => {
            })
          }
        }, (response) => {
        });
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
    width: 70%;

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
    width 100px

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
    width 100px
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

  .avatar {
    display inline-block
    height 160px
    width 160px
  }

  .radio-form
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
