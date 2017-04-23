<template>
  <div class="corner">
    <svg>
      <g>
        <polygon class="corner-polygon" points="0 45 90 0 0 0 0 45"></polygon>
      </g>
    </svg>
    <p>{{content}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['content']
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .corner
    position absolute
    align-self flex-start
    z-index 1
    width 80px
    height 40px
    svg
      width 90px
      height 45px
    .corner-polygon
      fill #A7C158
  p
    font-size 10px
    position absolute
    z-index 2
    margin-top -40px
    margin-left 6px
    color #fff
</style>
