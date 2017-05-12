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
        <!--<p>{{thisGroup}}</p>-->
        <!--<p>{{meetings}}</p>-->
        <!--<p>{{members}}</p>-->
      </ul>
    </div>
    <div class="members-wrap">
      <div class="members-title" style="position: relative">
        小组成员
        <i class="icon-add"></i>
      </div>
      <ul>
        <li v-for="item in members">
          <div class="deleteMember">×</div>
          <div class="avatar">
            <thumbnail :seed="item.email" width="46" height="46"
                       alt="avatar" radius="23px"></thumbnail>
          </div>
          <div>
            <div class="row">
              <div class="username">{{item.username}}</div>
              <div v-show="true ? item.user_id === thisGroup.leader : false" class="leader">组长</div>
            </div>
            <div class="email">{{item.email}}</div>
          </div>
        </li>
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
        thisGroup: null,
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
      if (this.$route.params.id && this.token) {
        this.$http.get(urlconf.getOneGroup(this.$route.params.id, this.token)).then(resp => {
          this.thisGroup = resp.body
        }, resp => {
        })
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
          this.$http.get(urlconf.getOneGroup(this.$route.params.id, this.token)).then(resp => {
            this.thisGroup = resp.body
          }, resp => {
          })
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
    flex-direction row
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    width: 80%
    margin-left 20%

  .members-wrap
    width 25%
    min-width 200px
    margin 20px 0
    box-shadow 0 0 8px #000000
    .members-title
      text-align center
      background-color #fafafa
      border-bottom 1px solid #676767
      padding 14px
      display flex
      flex-direction row
      justify-content center
      align-items center
      .icon-add
        top 50%
        margin-top -8px
        right 15%
        position: absolute
    ul
      margin 0
      background-color #fafafa
      li
        height 80px
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        .deleteMember
          margin 0 10px
          margin-right 5px
          font-size 28px
        .avatar
          margin 0 5px
        .email
          font-size 14px
          color #DEDEDE
          display flex
          flex-direction row
          justify-content flex-start
          flex-wrap wrap
        .row
          display flex
          flex-wrap nowrap
          width 100%
          .username
            font-size 16px
          .leader
            background-color #D83333
            color white
            border-radius 8px
            font-size 11px
            height 16px
            line-height 16px
            padding 1px 10px
            vertical-align middle
            margin auto
            margin-left 8px

  .meetings-wrap
    width 60%
    min-width 500px
    margin 20px 5%
    box-shadow 0px 3px 3px #bbbbbb
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
            align-items center
            .row
              display flex
              flex-wrap nowrap
              width 100%
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


</style>
