<template>
  <div id="loginPage">
    <v-header></v-header>
    <v-login></v-login>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  require('../../assets/global.css')
  import header from 'components/header'
  import login from 'components/login'
  import footer from 'components/footer'
  export default {
    name: 'loginPage',
    components: {
      'v-header': header,
      'v-login': login,
      'v-footer': footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
