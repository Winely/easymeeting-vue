<template>
  <div id="app">
    <div class="sidebar">
      <h4>会议结构</h4>
      <outline id="outlines" :items="meetinginfo.outline" :layer="1"></outline>
    </div>
    <div class="mainwindow">
      <tabs type="card" v-model="tabIndex" @tab-click="shareScreen">
        <tab-pane label="会议文档" name="pad">
          <etherpad :user="user"></etherpad>
        </tab-pane>
        <tab-pane label="会议屏幕" name="screen">
          <screenview :groupId="groupinfo.team_id"></screenview>
        </tab-pane>
        <tab-pane label="分享屏幕" name="share">
          <video id="share"></video>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
  require('../../assets/global.css')
  import urlconf from 'assets/url.conf'
  import etherpad from 'components/etherpad'
  import screenview from 'components/screenView'
  import outline from 'components/outline'
  import {Tabs, TabPane} from 'element-ui'

  export default {
    name: 'app',
    data () {
      return {
        user: {},
        meetinginfo: {},
        groupinfo: {},
        meeting_id: 0,
        tabIndex: 'pad'
      }
    },
    methods: {
        shareScreen (tab, e) {
          if(tab.name != 'share') return
          var path = "123.206.123.213:3000";
          var target = $('#share')[0]
//          path = "localhost:3001";
          var socket = io.connect(path);
          var options = {video: { mediaSource:"screen", width: window.innerWidth, height: window.innerHeight }};
          var getUserMedia = navigator.mediaDevices.getUserMedia(options);
          var canvas = document.createElement("canvas");
          canvas.setAttribute("width",window.innerWidth);
          canvas.setAttribute("height",window.innerHeight);
          var ctx=canvas.getContext('2d');
          if(getUserMedia) {
            getUserMedia.then(function (stream) {
              target.src = URL.createObjectURL(stream);
              target.play();
              window.setInterval(upload,10);
            })
          }
          function upload() {
            ctx.drawImage(target, 0, 0, window.innerWidth, window.innerHeight);
            socket.emit("upload_success",{
              data:canvas.toDataURL('image/png'),
              id:socket.id
            });
          }
        }
    },
    components: {
      Tabs,
      TabPane,
      etherpad,
      screenview,
      outline
    },
    watch: {
      meeting_id (val) {
        this.$http.get(urlconf.meetinginfo(val, this.user.token))
          .then(resp => {
            console.log(resp.body)
            this.meetinginfo = resp.body
            this.meetinginfo.outline = JSON.parse(this.meetinginfo.outline)
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

        this.$http.get(urlconf.getGroupMeetings(this.$route.params.groupid, this.user.token))
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
  @import "https://unpkg.com/element-ui/lib/theme-default/index.css"

  html
    height 100vh
    overflow hidden

  #app
    background #F2F2F2
    height 100vh
    display flex
    margin-bottom -24px

  ::-webkit-scrollbar
    display none

  .sidebar
    flex 1
    background #F2F2F2
    box-shadow 0 0 16px #aaa
    z-index 2
    overflow scroll

    h4
      text-align center
      background #8ab537
      color #fff
      margin 0
      line-height 3em
      font-weight 600

  .mainwindow
    flex 4
    float right

  .el-tabs
    display flex
    flex-direction column
    height 100%
    .el-tabs__content
      flex 100
  .el-tab-pane
    height 100%
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active
    color #8ab537
    border-bottom-color #F2F2F2
</style>
