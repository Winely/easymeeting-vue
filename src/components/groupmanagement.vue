<template>
  <div class="groupManagement-wrap">
    <p>{{$data}}</p>
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
      if (this.token) {
        this.$http.get(urlconf.group(this.token)).then(resp => {
          this.groups = resp.body
        }, resp => {
        })
      }
      else {
        alert("token undefined!")
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .groupManagement-wrap {
    width: 80%
    margin-left 20%
  }
</style>
