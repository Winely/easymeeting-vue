<template>
  <ul>
    <li v-for="item in items" :style="style">
      <p v-if="typeof(item)==='string'">{{ item }}</p>
      <p v-else>{{ Object.keys(item)[0] }}</p>
      <outline v-if="typeof(item)=='object'" :items="Object.values(item)[0]" :layer="layer+1"></outline>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'outline',
    props: ['items', 'layer'],
    data () {
      return {
        style: {
          textIndent: '',
          fontWeight: 200
        }
      }
    },
    created () {
      this.style.textIndent = this.layer * 20 + 'px'
      this.style.fontWeight = this.layer<4?(7-this.layer)*100:100
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  ul
    font-size 14px

  p
    transition .3s
    margin 0
    line-height 2em
    cursor pointer
    &:hover
      background #999
      color #fff

</style>
