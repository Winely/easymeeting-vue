<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
    <div class="index-wrapper">
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
    </div>
    <v-footer></v-footer>
  </div>
</template>
cd .
<script>
  require('../../assets/global.css')
  import urlconf from '/src/assets/url.conf'
  import header from 'components/header'
  import footer from 'components/footer'
  export default {
    name: 'app',
    components: {
      'v-header': header,
      'v-footer': footer
    },
    data () {
      return {
//        测试用，等api弄好了就应该是null
//        user: null
        user: {
          username: '王大锤',
          token: 'dfjweiower'
        }
      }
    },
    methods: {
      logout () {
        this.user = null
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        location.href='/login.html'
      }
    },
    created () {
      if (sessionStorage.user) {
        this.user = user
      }
      else {
        if (localStorage.user) {
          this.user = localStorage.user
          this.$http.get(urlconf.userinfo(this.user.token)).then(resp => {
            if (resp.code === 200) {
              if (resp.body.status === 0) {
                this.user = resp.body.user
                sessionStorage.user = resp.body.user
              }
              else if (resp.body.status === 1) {
                //do nothing
              }
              else {
                this.user = null
                localStorage.removeItem('user')
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index-wrapper
    margin-top 50px
    text-align center
</style>
