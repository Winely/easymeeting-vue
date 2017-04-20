<template>
  <div id="signupPage">
    <v-header></v-header>
    <div class="signPageWrap">
      <form class="signup-box">
        <input name="userId" type="text" required="required" title="hi" placeholder="登录名/邮箱名">
        <input name="userNickname" required="required" type="text" placeholder="昵称">
        <input name="userPassword1" required="required" type="password" @change.prevent='checkPasswords'
               placeholder="密码">
        <input name="userPassword2" required="required" type="password" @change.prevent='checkPasswords'
               placeholder="确认密码">
        <div class="radio-form">
          <input id="male" type="radio" name="gender" value="1">
          <label for="male"></label>
          <label class="gender-label" for="male">男</label>

          <input id="female" type="radio" name="gender" value="0">
          <label for="female"></label>
          <label class="gender-label" for="female">女</label>
        </div>
        <textarea placeholder="自我介绍" maxLength="150"></textarea>
        <button class="submit-button" type="submit">注 册</button>
      </form>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script type="text/ecmascript-6">
  require('../../assets/global.css')
  import header from 'components/header'
  import footer from 'components/footer'
  export default {
    name: 'signupPage',
    components: {
      'v-header': header,
      'v-footer': footer
    },
    methods: {
      checkPasswords: function () {
        var pass1 = document.getElementById('password1')
        var pass2 = document.getElementById('password2')
        if (pass1.value !== pass2.value) {
          pass1.setCustomValidity('两次输入的密码不匹配')
        }
        else {
          pass1.setCustomValidity('')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  bg-color = #F1F4E4
  input, textarea {
    border-radius: 8px;
    height: 28px;
    width: 200px;
    margin: 6px;
    padding: 2px 18px;
  }

  textarea
    height 150px
    padding-top 8px

  .signPageWrap {
    width: 100%;
    min-width: 300px;
    height: 560px;
    margin-top 50px
  }

  .signup-box {
    float: right;
    height: 100%;
    width: 30%;
    min-width: 300px;
    background-color: bg-color;
    display: flex
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .radio-form
    display flex
    align-items center
    justify-content space-around
    margin 10px auto
    input
      position absolute
      left -999px
    input + label
      display inline-block
      width 14px
      height 14px
      background transparent
      border solid 2px theme-color
      border-radius 4px
      margin-right 18px
      margin-left 20px
      transition-duration .3s
      &:hover
        background rgba(138, 181, 55, 0.4)
    input:checked + label
      background theme-color
    .gender-label
      margin-right 40px
</style>
