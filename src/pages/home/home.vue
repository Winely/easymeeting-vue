<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
    <div class="home-wrap">
      <sidebar :user="user"></sidebar>
      <router-view class="router-view" :token="user.token"></router-view>
    </div>
  </div>
</template>
cd .
<script>
  require('../../assets/global.css')

  import urlconf from 'assets/url.conf'
  import header from 'components/header'
  import sidebar from 'components/sidebar'

  export default {
    name: 'app',
    components: {
      'v-header': header,
      sidebar
    },
    data () {
      return {
        user: {
          username: '王大锤',
          email: '3243423@qq.com',
          gender: true,
          avatar: 'http://donggu.me/img/avatar.jpg',
          description: '是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。'
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
        this.user = user
      }
      else {
        if (localStorage.user) {
          this.user = localStorage.user
          this.$http.get(urlconf.userinfo(this.user.token)).then(resp => {
            if (resp.ok) {
              if (resp.body.status === 0) {
                this.user = resp.body.user
                sessionStorage.user = resp.body.user
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
  .home-wrap
    width 100%
    height 100%
    margin-top 50px

  .router-view
    width 80%
    margin-left 20%
    max-height 100% !important
</style>
