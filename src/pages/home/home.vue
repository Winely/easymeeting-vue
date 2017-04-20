<template>
  <div id="app">
    <v-header></v-header>
    <hr/>
    <v-footer></v-footer>
  </div>
</template>
cd .
<script>
  require('../../assets/global.css')
  import header from 'components/header'
  import footer from 'components/footer'
  export default {
    name: 'app',
    components: {
      'v-header': header,
      'v-footer': footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
