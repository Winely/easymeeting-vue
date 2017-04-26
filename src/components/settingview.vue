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
        <div>
          <label>头像</label>
          <thumbnail :seed="user.email" class="avatar" width="128" height="128" alt="avatar" radius="0em"></thumbnail>
        </div>
        <div>
          <label>昵称</label>
          <input :class="{'edit-disabled':!nickName_disabled}" name="nickName" :disabled="!nickName_disabled" type="text" :value="user.username">
          <button v-show="!nickName_disabled" @click.prevent="nickName_disabled = true" class="edit_btn" id="username_btn"><i
            class="icon-pencil"></i></button>
        </div>
        <div>
          <label for="newPassword">新密码</label>
          <input id="newPassword" name="newPassword" type="password">
        </div>
        <div>
          <label for="newPassword2">确认密码</label>
          <input id="newPassword2" type="password">
        </div>
        <div>
          <label for="description">个人简介</label>
          <textarea :class="{'edit-disabled':!description_disabled}" :disabled="!description_disabled" name="description" id="description" :value="user.description"></textarea>
          <button v-show="!description_disabled" @click.prevent="description_disabled = true" class="edit_btn" id="description_btn"><i
            class="icon-pencil"></i></button>
        </div>
        <div id="radio-form" class="radio-form">
          <label for="radio-form">性别</label>
          <input id="male" type="radio" name="gender" value="1">
          <label for="male"></label>
          <label class="gender-label" for="male">男</label>
          <input id="female" type="radio" name="gender" value="0">
          <label for="female"></label>
          <label class="gender-label" for="female">女</label>
        </div>
        <div>
          <label for="email">电子邮箱</label>
          <input :class="{'edit-disabled':!email_disabled}" :disabled="!email_disabled" id="email" type="email" :value="user.email">
          <button v-show="!email_disabled" @click.prevent="email_disabled = true" class="edit_btn" id="email_btn"><i class="icon-pencil"></i>
          </button>
        </div>
        <button type="submit">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  require('../assets/global.css')
  import thumbnail from './thumbnail'
  export default {
    data(){
      return {
        email_disabled: false,
        nickName_disabled: false,
        description_disabled: false,
        user: null
      }
    },
    created () {
      if (sessionStorage.user) {
        this.user = JSON.parse(sessionStorage.user)
      }
    },
    methods: {
      submit: function () {

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

  input, textarea {
    border-radius: 4px;
    height: 22px;
    width: 150px;
    margin: 6px;
    padding: 2px 6px;
  }

  textarea
    height 150px

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

  .edit-disabled {
    border-color transparent
  }

  .avatar {
    height 160px
    width 160px
  }

  .radio-form
    width 400px
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
