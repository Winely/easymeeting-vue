<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
    <div id="index-wrapper" @click="test">
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
      <h2>我是首页</h2>
      <h2>我是广告</h2>
    </div>
    <popup>
      <h3 slot="popup-head">fienfoiwnef</h3>
      <h4 slot="popup-body">fienfoiwnef</h4>
    </popup>
    <v-footer></v-footer>
  </div>
</template>
cd .
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
      test () {
          var opt = {
            format: 'svg',
            size: 420
          }
          var data = new Identicon(md5(new Date().getTime()),opt).toString()
        console.log(data.length)
        document.getElementById('index-wrapper')
          .innerHTML='<img width=420 height=420 src="data:image/svg+xml;base64,' + data + '">';
      },
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
    margin-top 50px
    text-align center
</style>
