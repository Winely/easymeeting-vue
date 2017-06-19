<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
    <div id="index-wrapper">
      <div class="main">
        <h1>EasyMeeting 会易</h1>
        <h2>小组在线会议系统</h2>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  require('../../assets/global.css')
  import urlconf from 'assets/url.conf'
  import header from 'components/header'
  import footer from 'components/footer'
  import Identicon from 'identicon.js'
  import md5 from 'blueimp-md5'
  import popup from 'components/popup'
  export default {
    name: 'app',
    components: {
      'v-header': header,
      'v-footer': footer,
      popup
    },
    data () {
      return {
        user: null
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
  #index-wrapper
    background-image: url("../../images/bg0.jpg")
    margin-top 50px
    text-align center
    height 500px
    .main
      background rgba(#fff, 0.7)
      height 100%
      width 80%
      margin 0 10%
      display flex
      flex-direction column
      justify-content center
      h1
        font-size 64px
        margin 0
      h2
        color #6e794a
        font-weight 400
</style>
