<template>
  <div id="app">
    <v-header :user="user" @logout="logout"></v-header>
  </div>
</template>

<script>
  require('../../assets/global.css')
  import urlconf from 'assets/url.conf'
  import header from 'components/header'

  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
