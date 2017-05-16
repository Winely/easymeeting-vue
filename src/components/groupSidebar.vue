<template>
  <div class="groupSidebar">
    <a class="active" href="/home.html">< -- 我的小组</a>
    <div class="groupList">
      <ul>
        <router-link v-for="item in groups" @click="chooseGroup(item)" :to="'/groupmanagement/'+item.team_id"
                     :key="item.team_id">{{ item.name }}
        </router-link>
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
        selectedGroup: null,
        user: null,
        groups: null,
      }
    },
    created() {
      if (sessionStorage.user) {
        this.user = JSON.parse(sessionStorage.user)
      }
      if (this.user.token) {
        this.$http.get(urlconf.group(this.user.token)).then((response) => {
            this.groups = response.body
//            this.selectedGroup = this.groups[0].team_id
          },
          (response) => {
          })
      }
      else {
        alert("token undefined")
      }

    },
    components: {},
    methods: {
      chooseGroup: function (t) {
        alert(t)
//        this.selectedGroup = t.team_id
        if (t.team_id && this.user.token) {
          this.$http.get(urlconf.getMeetings(t.team_id, this.user.token)).then((response) => {
            this.meetings = response.body
          }, (response) => {
          })
        }
        else {
          alert("token || selectedGroup undefined")
        }
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
    overflow scroll
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
    .router-link-active, a:active
      background btn-bg!important
      font-weight bold
      color #fff

</style>
