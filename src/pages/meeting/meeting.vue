<template>
  <div id="app">
    <div id="docpad"></div>
  </div>
</template>

<script>
  require('../../assets/global.css')
  require('../../assets/ether-pad')
  import urlconf from 'assets/url.conf'

  export default {
    name: 'app',
    components: {},
    mounted () {
      $('#docpad').pad({'padId': 'test','showChat':true, 'plugins':{'pageview':'true'}})
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width: 90vw
    height: 90vh

  #docpad
    width 100%
    height 100%
    box-shadow 0 3px 20px #eee

  #epframedocpad
    height: 100%
    width: 100%
</style>
