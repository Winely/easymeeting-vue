<template>
  <div id="app">
    <v-header></v-header>
    <div class="home-wrap">
      <sidebar :user="user"></sidebar>
      <router-view class="router-view"></router-view>
    </div>
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
      return {
        user: {
          username: '王大锤',
          email: '3243423@qq.com',
          gender: true,
          avatar: 'http://donggu.me/img/avatar.jpg',
          description: '是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。'
        }
      }
    },
    created () {
//      if (!localStorage.user) {
//        location.href = '/login.html'
//      }
//      this.user = localStorage.user;
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-wrap
  width 100%
  height 100%
.router-view
  width 80%
  margin-left 20%
</style>
