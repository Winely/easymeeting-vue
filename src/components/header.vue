<template>
  <nav>
    <a aria-label="会易首页" href="/" class="header-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.26 28.89">
        <title>easymeeting</title>
        <g id="icon">
          <rect class="icon" x="10.29" y="1.73" width="8.35" height="8.35"
                transform="translate(8.41 -8.5) rotate(45)"></rect>
          <rect class="icon" x="18.81" y="10.25" width="8.35" height="8.35"
                transform="translate(16.93 -12.03) rotate(45)"></rect>
          <rect class="icon" x="10.25" y="18.81" width="8.35" height="8.35"
                transform="translate(20.48 -3.47) rotate(45)"></rect>
          <rect class="icon" x="1.73" y="10.29" width="8.35" height="8.35"
                transform="translate(11.96 0.06) rotate(45)"></rect>
          <path class="icon"
                d="M49.47,6.25A35.07,35.07,0,0,1,40.26,14a17.17,17.17,0,0,0-1.13-1.5,26.84,26.84,0,0,0,9.54-8h2.19l-.39.51a20.55,20.55,0,0,0,9.37,7A17.46,17.46,0,0,0,58.7,13.8,23.62,23.62,0,0,1,49.47,6.25Zm3.1,12.39q3,2.65,5.13,5l-1.33,1.19q-.66-.76-1.52-1.68-5.11.31-10.44.7a6,6,0,0,0-1.74.45l-.92-1.7a5.31,5.31,0,0,0,1.7-1,29.88,29.88,0,0,0,3.45-4.08H40.05V16H58.88v1.52H49a61.83,61.83,0,0,1-4.08,4.7l8.65-.43-2.07-2.09Zm-8.8-6.89H55.09v1.52H43.77Z"></path>
          <path class="icon"
                d="M60.34,18.25a17,17,0,0,0,5.56-4.84l1.46.55q-.41.55-.82,1.07H79.26q-.18,3.88-.39,6-.27,3.3-3.32,3.32-1.7,0-3.55,0-.12-.88-.31-1.74,1.78.16,3.45.16a1.92,1.92,0,0,0,2.13-1.93q.23-1.85.31-4.37H74.43q-1.25,5.39-7.28,8.29-.53-.68-1.15-1.39,5.74-2.36,6.83-6.89H69.71q-1.5,4.37-7.92,6.85-.53-.68-1.15-1.37,6-2.26,7.36-5.48H65.24a21.3,21.3,0,0,1-3.88,3.1Q60.93,18.94,60.34,18.25ZM63,5.35H78.08v8.53h-1.6v-.82H63ZM76.48,6.78H64.58V8.46H76.48ZM64.58,11.62H76.48V9.9H64.58Z"></path>
        </g>
      </svg>
    </a>
    <ul v-if="user!=null" class="user-operation">
      <li><a href="/person.html">{{user.username}}</a></li>
      <li><a>注销</a></li>
    </ul>
    <ul v-else class="user-operation">
      <li><a href="/login.html">登录</a></li>
      <li><a href="/signup.html">注册</a></li>
    </ul>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        user: null
      }
    },
    created () {
      if (localStorage.user) {
        this.user = localStorage.user
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #a7c158
  nav
    height 50px
    background #333
    top 0
    width 100%
    min-width 450px
    position fixed
    z-index 3
  .header-icon
    display inline-block
    margin 10px 30px
    svg
      height 30px

  .icon
    fill theme-color

  ul
    justify-self marker-end
    float right
    margin 0 30px
    display inline-flex
    list-style none
    line-height 50px
    li
      line-height 50px
      text-align center
      vertical-align middle
      height 50px
      width 100px
      transition-duration .3s
      a
        display inline-block
        text-decoration none
        width 100%
        color #fff
      &:hover
        background #444

</style>
