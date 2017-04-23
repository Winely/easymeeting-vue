<template>
  <div class="groupview">
    <header>
      <svg class="router-icon-s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.89 28.89">
        <title>icon</title>
        <g>
          <rect class="icon-s" x="10.29" y="1.73" width="8.35" height="8.35"
                transform="translate(8.41 -8.5) rotate(45)"></rect>
          <rect class="icon-s" x="18.81" y="10.25" width="8.35" height="8.35"
                transform="translate(16.93 -12.03) rotate(45)"></rect>
          <rect class="icon-s" x="10.25" y="18.81" width="8.35" height="8.35"
                transform="translate(20.48 -3.47) rotate(45)"></rect>
          <rect class="icon-s" x="1.73" y="10.29" width="8.35" height="8.35"
                transform="translate(11.96 0.06) rotate(45)"></rect>
        </g>
      </svg>
      <h2>我的小组</h2>
      <button type="button">+ 添加小组</button>
    </header>
    <div class="groups">
      <section v-for="group in groups">
        <div class="col">
          <thumbnail :img-src="group.avatar" width="72px" height="72px" radius="999em" :alt="group.name"></thumbnail>
        </div>
        <div class="col">
          <h3><a href="/">{{group.name}}</a></h3>
          <p>{{group.description}}</p>
          <ul class="btn-list">
            <li><a><i class="icon-play"></i>进入会议</a></li>
            <li><a><i class="icon-conf"></i>小组管理</a></li>
            <li><a><i class="icon-add"></i>新建预约</a></li>
          </ul>
        </div>
        <corner v-if="group.corner" :content="group.corner"></corner>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import thumbnail from 'components/thumbnail'
  import corner from 'components/corner'
  export default {
    props: ['token'],
    data () {
      return {
        groups: [
          {
            name: '滚滚长江东逝水1',
            description: '是非成败转头空，青山依旧在，惯看秋月春风。',
            isLeader: false,
            avatar: 'http://donggu.me/img/avatar.jpg',
            corner: false
          },
          {
            name: '滚滚长江东逝水2',
            description: '是非成败转头空，青山依旧在，惯看秋月春风。',
            isLeader: false,
            avatar: 'http://donggu.me/img/avatar.jpg',
            corner: '开会中'
          },
          {
            name: '滚滚长江东逝水3',
            description: '是非成败转头空，青山依旧在，惯看秋月春风。',
            isLeader: false,
            avatar: 'http://donggu.me/img/avatar.jpg',
            corner: '59"'
          },
          {
            name: '滚滚长江东逝水4',
            description: '是非成败转头空，青山依旧在，惯看秋月春风。',
            isLeader: false,
            avatar: 'http://donggu.me/img/avatar.jpg',
            corner: '23h'
          }
        ],
      }
    },
    components: {
      thumbnail,
      corner
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .router-icon-s
    width 30px
    height 30px
    .icon-s
      fill #a7c158

  header
    display flex
    align-items center
    padding-left 30px
    svg
      margin-right 20px
    button
      color #fff
      background #FFCA4C
      border-radius 9px
      border none
      font-size 16px
      width 125px
      height 34px
      line-height 34px
      margin-left 50px
      cursor pointer
      transition-duration .3s
      &:hover
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.16)

  .groups
    display flex
    flex-wrap wrap
    padding-left 24px
    section
      display flex
      align-items center
      background #F2F2F2
      width 400px
      margin 0 30px 30px 30px
      transition-duration .3s
      &:hover
        box-shadow 0 0 10px #aaa
      .col
        display flex
        flex-direction column
        justify-content space-around
        padding 0 20px
        &:first-child
          height 120px
          border-right solid .5px #A7C158
      .thumbnail
        width 72px
        height 72px
        background #fff
      h3
        font-size 16px
        margin-bottom 0
      p
        font-size 14px
        font-weight 200
        color #939880
        margin 6px auto
      ul
        display flex
        flex-wrap wrap
        justify-content space-between
        font-size 12px
        font-weight 200
        li
          transition-duration .3s
          padding 4px 8px
          border-radius 4px
          cursor pointer
          &:hover, &:active
            background #fff
        i
          color #A7C158
          margin-right 4px
@media (max-width:600px)
  section
    width 90%
</style>
