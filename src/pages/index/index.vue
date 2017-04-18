<template>
  <div id="app">
    <v-header></v-header>
    <hr/>
    <v-footer></v-footer>
  </div>
</template>
cd .
<script>
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
  body
    margin 0
  a
    text-decoration none
    color inherit
  ul
    list-style none
    padding 0
</style>
