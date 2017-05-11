<template>
  <div class="groupManagement-wrap">
    <div class="meetings-wrap">
      <div class="meeting-title">会议安排</div>
      <ul>
        <li v-for="item in meetings" @click="detail(item)">
          <div class="meeting">
            <div class="left">
              <div class="row">
                <div class="meeting-color" :style="{backgroundColor:item.color}"></div>
                <p>{{item.name}}</p>
              </div>
              <div class="row meetingInfo">
                <i class="icon-user"></i>
                <p class="leader-name">王大锤</p>
                <p class="meeting-time">2017-06-05 00:00:00</p>
                <p>~</p>
                <p class="meeting-time">2017-06-05 00:00:00</p>
              </div>
            </div>
            <a class="right"></a>
          </div>
          <div v-show="item.show" class="meetingDetail">
            <div class="description">{{item.introduction}}</div>
            <div class="outline">{{item.outline}}</div>
          </div>
        </li>
        <p>{{meetings}}</p>
        <p>{{members}}</p>
      </ul>
    </div>
    <div class="members-wrap">
      <div class="members-title">小组成员</div>
      <ul>
        <li v-for="item in members">{{item.username}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import urlconf from 'assets/url.conf'
  import thumbnail from './thumbnail'
  import corner from './corner'
  export default {
    props: ['token'],
    data () {
      return {
        groups: [],
        meetings: null,
        members: null
      }
    },
    components: {
      thumbnail,
      corner
    },
    watch: {
      '$route': 'fetchDate'
    },
    created () {
      if (this.token) {
        this.$http.get(urlconf.group(this.token)).then(resp => {
          this.groups = resp.body
        }, resp => {
        })
      }
      else {
        alert("token undefined!")
      }
      if (this.$route.params.id && this.token) {
        this.$http.get(urlconf.getMeetings(this.$route.params.id, this.token)).then((response) => {
          var res = response.body
          for (var i = 0; i < res.length; i++) {
            res[i]['show'] = false
          }
          this.meetings = res
        }, (response) => {
        })
        this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.token)).then((response) => {
          this.members = response.body
        }, (response) => {
        })
      }
      else {
        alert("token || selectedGroup undefined")
      }
    },
    methods: {
      fetchDate: function () {
        if (this.$route.params.id && this.token) {
          this.$http.get(urlconf.getMeetings(this.$route.params.id, this.token)).then((response) => {
            var res = response.body
            for (var i = 0; i < res.length; i++) {
              res[i]['show'] = false
            }
            this.meetings = res
          }, (response) => {
          })
          this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.token)).then((response) => {
            this.members = response.body
          }, (response) => {
          })
        }
        else {
          alert("token || selectedGroup undefined")
        }
      },
      detail: function (item) {
        for (var i = 0; i < this.meetings.length; i++) {
          this.meetings[i].show = false
        }
        item.show = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .groupManagement-wrap
    display flex
    flex-wrap wrap
    width: 80%
    margin-left 20%

  .meetings-wrap
    display inline-block
    width 60%
    min-width 500px
    margin 20px 3%
    .meeting-title
      padding 14px
      text-align center
      background-color #373737
      color white
      box-shadow 0px 3px 3px #bbbbbb
    ul
      margin 0
      li
        .meeting
          box-shadow 0px 3px 3px #bbbbbb
          padding 15px 30px
          height 60px
          display flex
          flex-wrap wrap
          flex-direction row
          justify-content flex-start
          a
            cursor pointer
          .left
            width 85%
            display flex
            flex-wrap wrap
            flex-direction row
            justify-content flex-start
            .row
              display flex
              flex-wrap nowrap
              width 100%
              margin auto
            p
              height 20px
              margin 0
              font-size 18px
            .meetingInfo
              color #95989A
              p
                font-size 14px
              .icon-user
                margin-right 8px
              .leader-name
                margin-right 30px
              .meeting-time
                margin 0 5px
            .meeting-color
              height 20px
              width 20px
              border-radius 10px
              background-color red
              margin-right 10px
          .right
            background-color #BBD176
            height 30px
            width 30px
            border-radius 15px
            margin auto
        .meetingDetail
          display flex
          flex-wrap wrap
          flex-direction row
          justify-content flex-start
          border 1px solid #F2F2F2
          background-color #F2F2F2
          .description
            padding 0 4.9%
            margin 20px 0
            width 40%
            height 100px
            border-right 2px solid #DDDDDD
          .outline
            padding 0 4.9%
            margin 20px 0
            width 40%
            height 100px

  .members-wrap
    display inline-block
    width 25%
    min-width 200px
    margin 20px 0
    .members-title
      padding 14px
      text-align center
      background-color #fafafa
    ul
      margin 0
      li
        height 100px


</style>
