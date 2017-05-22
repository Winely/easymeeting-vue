<template>
  <div id="etherpad-container"></div>
</template>

<script type="text/ecmascript-6">
  require('../assets/ether-pad')
  export default {
    props: ['user'],
    mounted()
    {
      $('#etherpad-container').pad({
        'padId': this.$route.params.groupid,
        'userName': this.user.username,
        'showChat': true,
        'plugins': {'pageview': 'true'}
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #epframeetherpad-container
    height: 100%
    width: 100%
</style>
