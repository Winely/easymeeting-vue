<template>
  <div class="popup">
    <div class="mask"></div>
    <div class="popup-win">
      <button class="close" @click.prevent="closePopup"><i class="iconfont">x</i></button>
      <header>
        <slot name="popup-head"></slot>
      </header>
      <div class="popup-body" :class="align">
        <slot name="popup-body"></slot>
        <button @click="finish"><i class="iconfont">√</i></button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['align'],
    methods: {
      closePopup (e) {
        // 渐隐窗口
        this.$el.style.opacity = 0
        setTimeout(() => {this.$emit('cancel')}, 300)
      },
      finish () {
        this.$emit('finish')
      }
    },
    mounted () {
      setTimeout(() => {
        this.$el.style.opacity = 1
      }, 0)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  .popup
    opacity 0
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    z-index 10
    display flex
    justify-content center
    align-items center
    transition .3s

  .popup-win
    border-radius 16px
    box-shadow 0 5px 35px #666
    background: #fff
    position absolute
    z-index 12
    transition-duration .3s
    min-width 500px

    .close
      display block
      border none
      background none
      border-radius 3px
      color inherit
      outline none
      transition .3s
      cursor pointer
      position absolute
      right 12px
      top 8px
      font-size 24px
      width 24px
      height 24px
      vertical-align middle
      &:hover
        background rgba(#fff, 0.5)
      &:active
        background #fff

    header
      padding 70px 12px 22px 12px
      color #BBD176
      background #F1F4E4
      border-radius 16px
      display flex
      flex-direction column
      justify-content center
      p, input
        font-size 25px
        font-weight 200
        outline none
        background none
        border none
        color inherit
        text-align center
        -webkit-text-fill-color #BBD176

    .popup-body
      margin 12px 30px 30px 30px
      vertical-align baseline
      display flex
      flex-direction column
      justify-content space-around
      &.center
        & > div
          display flex
          align-items baseline
          margin 10px auto
          span
            margin-right 20px
            margin-left -30px
      button
        font-size 18px
        line-height 46px
        vertical-align middle
        color theme-color
        background transparent
        border solid 1px theme-color
        width 46px
        height 46px
        border-radius 99em
        align-self center
        outline none
        cursor pointer
        transition .3s
        margin-top 14px
        &:hover
          background theme-color
          color #fff

  .mask
    background rgba(#000, 0.5)
    position absolute
    z-index 9
    width 100%
    height 100%
    left 0
    transition .3s
</style>
