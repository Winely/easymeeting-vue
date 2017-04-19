<template>
  <div id="signupPage">
    <v-header></v-header>
    <v-signup></v-signup>
    <v-footer></v-footer>
  </div>

</template>

<script type="text/ecmascript-6">
  require('../../assets/global.css')
  import header from 'components/header'
  import signup from 'components/signup'
  import footer from 'components/footer'
  export default {
    name: 'signupPage',
    components: {
      'v-header': header,
      'v-signup': signup,
      'v-footer': footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
