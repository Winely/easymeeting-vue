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
  import urlconf from 'assets/url.conf.js'
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
        location.href = '/login.html'
      }
    },
    created () {
      if (sessionStorage.user) {
        this.user = JSON.parse(sessionStorage.user)
      }
      else {
        if (localStorage.user) {
          this.user = JSON.parse(localStorage.user)
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
