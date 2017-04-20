<template>
  <div id="app">
    <v-header></v-header>
    <div class="home-wrap">
      <sidebar :user="user"></sidebar>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>
cd .
<script>
  require('../../assets/global.css')
  import header from 'components/header'
  import footer from 'components/footer'
  import sidebar from 'components/sidebar'
  export default {
    name: 'app',
    components: {
      'v-header': header,
      'v-footer': footer,
      sidebar
    },
    data () {
      user: {
      }
    },
    created () {
      if (!localStorage.user) {
        location.href = '/login.html'
      }
      this.user = localStorage.user;
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
