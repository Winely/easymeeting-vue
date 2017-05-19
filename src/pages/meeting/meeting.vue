<template>
  <div id="app">
    <div class="sidebar">
      {{$data.meetinginfo.outline}}
    </div>
    <router-view :user="user" class="etherpad"></router-view>
  </div>
</template>

<script>
  require('../../assets/global.css')
  import urlconf from 'assets/url.conf'
  import etherpad from 'components/etherpad'

  export default {
    name: 'app',
    data () {
      return {
        user: {},
        meetinginfo: {},
        groupinfo: {},
        meeting_id: 0
      }
    },
    watch: {
      meeting_id (val) {
        this.$http.get(urlconf.meetinginfo(val, this.user.token))
          .then(resp => {
            console.log(resp.body)
            this.meetinginfo = resp.body
          })
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

      if (this.$route.params.groupid) {
        this.$http.get(urlconf.groupinfo(this.$route.params.groupid, this.user.token))
          .then(resp => {
            this.groupinfo = resp.body
            document.title = `会易-${this.groupinfo.name}-开会中`
          })

        this.$http.get(urlconf.getMeetings(this.$route.params.groupid, this.user.token))
          .then(resp => {
              console.log(resp.body)
            var id = resp.body[0].meeting_id
            for (var i in resp.body) {
              if (resp.body[i].state === 1) {
                id = resp.body[i].meeting_id
                break
              }
            }
            this.meeting_id = id
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html
    height 100vh
    overflow hidden

  #app
    background #F2F2F2
    height 100vh
    display flex
    margin-bottom -24px

  .sidebar
    flex 1
    background #F2F2F2
    box-shadow 0 0 16px #aaa
    z-index 2

  .etherpad
    flex 4
    float right

</style>
