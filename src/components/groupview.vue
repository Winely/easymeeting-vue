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
        <img :src="group.avatar" :alt="group.name">
        <h3><a href="/">{{group.name}}</a></h3>
        <p>{{group.description}}</p>
        <ul class="btn-list">
          <li><a>进入会议</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['token'],
    data () {
      return {
        groups: [
          {
            name: '滚滚长江东逝水',
            description: '是非成败转头空，青山依旧在，惯看秋月春风。',
            isLeader: false,
            avatar: 'http://donggu.me/img/avatar.png'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.groupview
  padding 0 30px

.router-icon-s
  width 30px
  height 30px
  .icon-s
    fill #a7c158
header
  display flex
  align-items center
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
      box-shadow 0 2px 6px rgba(0,0,0,0.16)

</style>
