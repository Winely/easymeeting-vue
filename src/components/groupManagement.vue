<template>
  <div class="groupManagement-wrap">
    <p>{{$data}}</p>
    <p>{{$route.params.id}}</p>
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
        meetings: null
      }
    },
    components: {
      thumbnail,
      corner
    },
    watch: {
      '$route': 'fetchDate'
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
      if (this.$route.params.id && this.token) {
        this.$http.get(urlconf.getMeetings(this.$route.params.id, this.token)).then((response) => {
          this.meetings = response.body
        }, (response) => {
        })
      }
      else {
        alert("token || selectedGroup undefined")
      }
    },
    methods: {
      fetchDate: function () {
        console.log("methods")
        if (this.$route.params.id && this.token) {
          this.$http.get(urlconf.getMeetings(this.$route.params.id, this.token)).then((response) => {
            this.meetings = response.body
          }, (response) => {
          })
        }
        else {
          alert("token || selectedGroup undefined")
        }
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
