<template>
  <div id="loginPage">
    <v-header :user="user" @logout="logout"></v-header>
    <div class="loginPageWrap">
      <div class="bgWrap"></div>
      <form class="login-box">
        <input name="email" v-model="loginEmail" type="text" placeholder="登录名/邮箱名">
        <input id="userPassword" v-model="loginPassword" name="password" type="password" placeholder="请输入密码">
        <p v-if="wrong">用户名或密码错误，请重试</p>
        <button class="submit-button" type="submit" @click.prevent="login">登 录</button>
      </form>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  require('../../assets/global.css')
  import header from 'components/header'
  import footer from 'components/footer'
  import urlconf from 'assets/url.conf'
  export default {
    name: 'loginPage',
    components: {
      'v-header': header,
      'v-footer': footer
    },
    data () {
      return {
        user: null,
        loginEmail: '',
        loginPassword: '',
        wrong: false
      }
    },
    methods: {
      logout () {
        this.user = null
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        location.href = '/login.html'
      },
      login () {
        this.$http.post(urlconf.login(), {email: this.loginEmail, password: this.loginPassword}).then(resp => {
          this.user = resp.body.user
          sessionStorage.user = JSON.stringify(this.user)
          localStorage.user = JSON.stringify({
            username: this.user.username,
            token: this.user.token
          })
          location.href = '/home.html'
        }, resp => {
          this.loginPassword = ''
          this.wrong = true
        })
      }
    },
    created () {
      //如果还在登录状态就直接跳转到个人主页
      if (sessionStorage.user) {
        this.user = sessionStorage.user
        location.href = '/home.html'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  bg-color = rgba(255, 255, 255, 0.8)

  input {
    border-radius: 18px;
    height: 28px;
    width: 200px;
    margin: 12px;
    padding: 2px 18px;
  }

  .loginPageWrap {
    background-image: url("../../images/bg0.jpg");
    background-repeat no-repeat
    background-position: 0 0;
    width: 100%;
    min-width: 300px;
    height: 560px;
    margin-top 50px
  }

  .login-box {
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

  .login-box p
    color #ff813d
    margin 0 auto
    font-size 12px
</style>
