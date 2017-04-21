<template>
  <div id="signupPage">
    <v-header :user="user"></v-header>
    <div class="signPageWrap">
      <form class="signup-box" method="post" action="">
        <input v-model="email" @change="checkEmail($event)" name="email" id="email" type="email" required
               placeholder="登录名/邮箱名">
        <input v-model="username" name="username" required type="text" placeholder="昵称">
        <input v-model="password" id="userPassword1" name="password" required type="password"
               @change.prevent='checkPasswords'
               placeholder="密码">
        <input id="userPassword2" name="password2" required type="password" @change.prevent='checkPasswords'
               placeholder="确认密码">
        <div class="radio-form">
          <input v-model="gender" id="male" type="radio" name="gender" value="1">
          <label for="male"></label>
          <label class="gender-label" for="male">男</label>
          <input v-model="gender" id="female" type="radio" name="gender" value="0">
          <label for="female"></label>
          <label class="gender-label" for="female">女</label>
        </div>
        <textarea v-model="description" placeholder="自我介绍" name="description" maxlength="100"></textarea>
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
    data () {
      return {
        user: null,
        email: '',
        username: '',
        password: '',
        gender: '',
        description: ''
      }
    },
    methods: {
      fun: function () {
        return false
      },
      fun2: function () {
        alert("hi")
      },
      checkPasswords: function () {
        var pass1 = document.getElementById('userPassword1')
        var pass2 = document.getElementById('userPassword2')
        if (pass1.value !== pass2.value) {
          pass1.setCustomValidity('两次输入的密码不匹配')
        }
        else {
          pass1.setCustomValidity('')
        }
      },
      checkEmail: function (e) {
        if (!e.target.checkValidity()) {
          e.target.setCustomValidity('邮箱格式错误')
        }
//        this.$http.get('/api/userexist?email=' + email.value).then(resp => {
//          if (resp.code === 200) {
//            if (resp.body === true) {
//              e.target.setCustomValidity('该邮箱已被注册！')
//            }
//          }
//        })
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
