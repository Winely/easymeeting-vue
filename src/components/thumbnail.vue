<template>
  <div class="thumbnail" :style="styleObj">
    <img :src="'data:image/svg+xml;base64,'+avatar" :alt="alt" :style="'border-radius:' + radius"/>
  </div>
</template>

<script type="text/ecmascript-6">
  var md5 = require('blueimp-md5')
  var Identicon = require('identicon.js')
  export default {
    props: ['seed', 'alt', 'width', 'height', 'radius'],
    data () {
      return {
        styleObj: {
          width: this.width+'px',
          height: this.height+'px'
        }
      }
    },
    computed: {
        avatar () {
          var opt = {
            size: parseInt(this.width),
            format: 'svg'
          }
          return (new Identicon(md5(this.seed), opt).toString())
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .thumbnail
    text-align center

  .thumbnail img
    max-width 100%
    max-height 100%
</style>
