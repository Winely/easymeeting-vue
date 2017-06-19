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
                <p class="leader-name">{{thisGroup.leader}}</p>
                <p class="meeting-time">{{item.start_time.replace('T', ' ').replace('.000Z', '')}}</p>
                <p>~</p>
                <p class="meeting-time">{{item.end_time.replace('T', ' ').replace('.000Z', '')}}</p>
              </div>
            </div>
            <a class="right" target="_blank"
               :href="'http://easymeeting.donggu.me/meeting.html#/'+thisGroup.team_id"><i class="icon-play"></i></a>
          </div>
          <div :class="['meetingDetail',{'showDetail':item.show}]">
            <div :class="['description']">{{item.introduction}}</div>
            <div :class="['outline']">
              <outline :items="item.outline" :layer="1"></outline>
            </div>
          </div>
        </li>
        <li v-if="meetings.length===0||!meetings" class="noMeeting">当前小组尚未预约会议</li>
      </ul>
    </div>
    <div class="members-wrap">
      <div class="members-title" style="position: relative">
        小组成员
        <i class="icon-add" @click="invite=true"></i>
      </div>
      <ul>
        <li v-for="item in members">
          <div v-if="thisGroup.leader === user.user_id && thisGroup.leader!==item.user_id" class="deleteMember"
               @click="removeMember(item)">×
          </div>
          <div v-else class="cantDelete"></div>
          <div class="avatar">
            <thumbnail :seed="item.email" width="46" height="46"
                       alt="avatar" radius="23px"></thumbnail>
          </div>
          <div>
            <div class="row">
              <div class="username">{{item.username}}</div>
              <div v-if="item.user_id === thisGroup.leader" class="leader">组长</div>
            </div>
            <div class="email">{{item.email.length < 18 ? item.email : (item.email.substr(0, 17) + '…')}}</div>
          </div>
        </li>
      </ul>
    </div>
    <popup @finish="mask=false" @cancel="mask=false" v-if="this.mask" align="center">
      <p slot="popup-head">提示</p>
      <p slot="popup-body">{{this.promptinfo}}</p>
    </popup>
    <popup @finish="inviteFinish" @cancel="invite=false" v-if="this.invite" align="none" class="invite-mem">
      <p slot="popup-head">邀请组员</p>
      <inputs slot="popup-body" label="项目成员" name="member" class="invite"
              v-model="newMember" @input="searchUser"></inputs>
      <ul slot="popup-body">
        <li v-for="mem,index in newMembers">
          <span class="invite-username">{{ mem.name }}</span>
          <span class="invite-email">{{ mem.email }}</span>
          <i class="iconfont" @click="newMembers.splice(index, 1)">×</i>
        </li>
      </ul>
    </popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import urlconf from 'assets/url.conf'
  import thumbnail from './thumbnail'
  import corner from './corner'
  import outline from 'components/outline'
  import popup from './popup'
  import inputs from './inputGroup'
  export default {
    props: ['user'],
    data () {
      return {
        thisGroup: null,
        meetings: null,
        members: null,
        mask: false,
        promptinfo: "",
        invite: false,
        newMembers: [],
        newMember: ''
      }
    },
    components: {
      thumbnail,
      outline,
      popup,
      inputs
    },
    watch: {
      '$route': 'fetchDate'
    },
    created () {
      if (this.$route.params.id && this.user.token) {
        this.$http.get(urlconf.getOneGroup(this.$route.params.id, this.user.token)).then(resp => {
          this.thisGroup = resp.body
        })
        this.$http.get(urlconf.getGroupMeetings(this.$route.params.id, this.user.token)).then((response) => {
          var res = response.body
          for (var i = 0; i < res.length; i++) {
            res[i]['show'] = false
            res[i].outline = JSON.parse(res[i].outline)
          }
          this.meetings = res
        })
        this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.user.token)).then((response) => {
          this.members = response.body
        })
      }
    },
    methods: {
      searchUser (val) {
        this.$http.get(urlconf.exist(val)).then(resp => {
          this.newMembers.push({name: resp.body.username, email: val, id: resp.body.user_id})
        }, resp => {

        })
      },
      inviteFinish(){
        var list = []
        for (let i in this.newMembers){
            list.push(this.newMembers[i].id)
        }
        this.$http.post(urlconf.inviteMember(this.thisGroup.team_id), {token: this.user.token, memberId: list})
          .then(()=>{
              return this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.user.token))
          })
          .then(resp=>{
            this.members = resp.body
            this.invite=false
          })
      },
      fetchDate: function () {
        if (this.$route.params.id && this.user.token) {
          this.$http.get(urlconf.getOneGroup(this.$route.params.id, this.user.token)).then(resp => {
            this.thisGroup = resp.body
          })
          this.$http.get(urlconf.getGroupMeetings(this.$route.params.id, this.user.token)).then((response) => {
            var res = response.body
            for (var i = 0; i < res.length; i++) {
              res[i]['show'] = false
              res[i].outline = JSON.parse(res[i].outline)
            }
            this.meetings = res
          })
          this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.user.token)).then((response) => {
            this.members = response.body
          })
        }
      },
      detail: function (item) {
        for (var i = 0; i < this.meetings.length; i++) {
          this.meetings[i].show = false
        }
        item.show = true
      },
      removeMember: function (item) {
        this.$http.delete(urlconf.removeMember(this.$route.params.id, item.user_id), {body: {token: this.user.token}}).then((response) => {
          this.promptinfo = "成员删除成功！"
          this.mask = true
          this.$http.get(urlconf.getTeamMember(this.$route.params.id, this.user.token)).then((response) => {
            this.members = response.body
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .right
    color #fff
    line-height 30px
    text-align: center
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
    box-shadow 0 0 8px rgba(0, 0, 0, 16%)
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
        cursor: pointer
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
          cursor pointer
        .cantDelete
          margin 0 10px
          margin-right 25px
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
    box-shadow 0px 3px 6px rgba(187, 187, 187, 16%)
    .meeting-title
      padding 14px
      text-align center
      background-color #373737
      color white
      box-shadow 0px 3px 6px rgba(187, 187, 187, 16%)
    ul
      margin 0
      .noMeeting
        font-size 24px
        height 400px
        background-color #f2f2f2
        text-align center
        line-height 400px
        color #939880
      li
        .meeting
          box-shadow 0px 3px 6px rgba(187, 187, 187, 16%)
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
              line-height 20px
              margin 0
              font-size 20px
            .meetingInfo
              color #95989A
              p
                font-size 14px
                line-height 20px
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
          height 0px
          overflow hidden
          transition .3s
        .showDetail
          height 240px
          transition .3s
        .description
          padding 0 4.9%
          margin 20px 0
          width 40%
          height 200px
          border-right 2px solid #DDDDDD
        .outline
          padding 0 4.9%
          margin 20px 0
          width 40%
          height 200px
          overflow scroll
          ul
            font-size 14px
            p
              transition .3s
              margin 20px
              color #5bc0de !important
              &:hover
                background red
                color green

  .invite-mem
    .invite
      margin-bottom 5px !important
    ul
      margin 0
    li
      vertical-align middle
      line-height 24px
      padding 4px 28px
      margin 0
      cursor pointer
      &:hover
        background #eee
      i
        float right
        margin-right 10px
        font-size larger
        border-radius 99em
        padding 0 8px
        color #8AB537
        transition .3s
        &:hover
          background #fff
    .invite-username
      font-weight 600
    .invite-email
      font-size 14px
      color #999
</style>
