<template>
  <div id="app">
    <p>hhhhhhhhhhhhhhh</p>
    <v-header></v-header>
  </div>
</template>
cd .
<script>
  import header from 'components/header/header'
  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    margin 0
</style>
