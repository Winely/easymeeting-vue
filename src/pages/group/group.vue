<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
    <div class="group-wrap">
      <groupSidebar :user="user"></groupSidebar>
      <router-view class="router-view" :token="user.token"></router-view>
    </div>
  </div>
</template>

<script>
  require('../../assets/global.css')
  import urlconf from 'assets/url.conf'
  import header from 'components/header'
  import groupSidebar from 'components/groupSidebar'
  import groupManagement from 'components/groupManagement'

  export default {
    name: 'app',
    components: {
      'v-header': header,
      groupSidebar,
      groupManagement
    },
    data () {
      return {
        user: null,
        selected: ''
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
          this.$http.get(urlconf.userinfo(this.user.token)).then(resp => {
              this.user = resp.body.user
              sessionStorage.user = JSON.stringify(resp.body.user)
            },
            resp => {
              this.user = null
              localStorage.removeItem('user')
              location.href = '/login.html'
            })
        }
        else {
          location.href = '/login.html'
        }
      }

      this.$http.get(urlconf.getOneGroup(this.$route.params.groupid, this.user.token))
        .then(resp=>{
            document.title = `会易-${resp.body}`
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  ::-webkit-scrollbar
    width 0px

  .group-wrap
    width 100%
    height 100%
    margin-top 50px

  .router-view
    width 80%
    margin-left 20%
</style>
