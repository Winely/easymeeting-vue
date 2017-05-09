<template>
  <div class="groupSidebar">
    <a class="active" href="/home.html">< -- 我的小组</a>
    <div class="groupList">
      <ul>
        <li v-for="item in groups" @click="chooseGroup(item)" :class="{ 'active': item.team_id == selected }">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="meetingList">
      <ul>
        <li v-for="mt in meetings">
          {{ mt.meeting_id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import urlconf from 'assets/url.conf'
  export default {
//    props: ['user'],
    data () {
      return {
        selected: null,
        user: null,
        groups: [],
        meetings: []
      }
    },
    created() {
      if (sessionStorage.user) {
        this.user = JSON.parse(sessionStorage.user)
      }
      if (this.user.token) {
        this.$http.get(urlconf.group(this.user.token)).then((response) => {
            this.groups = response.body
          },
          (response) => {
          })
      }
      else {
        alert("token undefined")
      }
      this.selected = this.groups[0].team_id
      console.log(this.selected)
    },
    components: {},
    methods: {
      chooseGroup: function (t) {
        this.selected = t.team_id
        if (this.selected && this.user.token) {
          this.$http.get(urlconf.getMeetings(this.selected, this.user.token)).then((response) => {
            this.meetings = response.body
          }, (response) => {
          })
        }
        else {
          alert("token || selected undefined")
        }
      },
      getMeeting: function () {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  btn-bg = #A7C158
  description-color = #939880
  link-color = #6E794A
  bg-color = #F1F4E4

  .groupSidebar
    background bg-color
    text-align center
    width 20%
    position fixed
    height 100%
    .avatar
      border-radius 999em
      margin auto
      margin-top 30px
    h4
      font-size 20px
      font-weight 300
      margin 10px
    p
      font-size 14px
      font-weight 300
      padding 0 20px
      text-indent 18px
      text-align justify
      color description-color
    a
      display block
      color link-color
      transition-duration .3s
      width 100%
      height 72px
      line-height 72px
      cursor pointer
      &:hover
        background rgba(167, 193, 88, 0.6)
    a.active
      background theme-color!important
      color #fff

  .groupList
    li
      line-height 30px
      padding 8px 6px
      color #95989A
      cursor pointer
    li.active
      background-color #F5FCDC
      color #4D6309
      font-weight 700

</style>
