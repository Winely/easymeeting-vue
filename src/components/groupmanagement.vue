<template>
  <div class="groupManagement-wrap">
    xxxxxxxxxxxxxxxxxxx
  </div>
</template>

<script type="text/ecmascript-6">
  import urlconf from 'assets/url.conf'
  import thumbnail from './thumbnail'
  import corner from './corner'
  export default {
    props: ['token'],
    data () {
      return {
        groups: [],
      }
    },
    components: {
      thumbnail,
      corner
    },
    created () {
      this.$http.get(urlconf.group(this.token)).then(resp => {
        this.groups = resp.body
      }, resp => {

      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .groupManagement-wrap {
    width: 80%
    margin-left 20%
  }
</style>
