<template>
  <div class="sidebar">
    <div class="user-info">
      <thumbnail class="avatar" :seed="user.email" radius="0"
                 alt="user avatar" width="128" height="128"></thumbnail>
      <h4>{{user.username}}</h4>
      <p>{{user.description}}</p>
    </div>
    <div class="tag-list">
      <router-link v-for="item in links" :to="item.path" :key="item.path">{{ item.title }}</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import thumbnail from './thumbnail'
  export default {
    props: ['user'],
    data () {
      return {
        links: [
          {path: '/group', title: '我的小组'},
          {path: '/calendar', title: '会议日程'},
          {path: '/setting', title: '个人设置'}
        ]
      }
    },
    components: {
      thumbnail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  btn-bg = #A7C158
  description-color = #939880
  link-color = #6E794A
  bg-color = #F1F4E4

  .sidebar
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
      &:hover
        background rgba(167, 193, 88, 0.6)
    .router-link-active, a:active
      background btn-bg!important
      color #fff

</style>
