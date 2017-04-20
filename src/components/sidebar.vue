<template>
  <div class="sidebar">
    <div class="user-info">
      <img class="avatar" :src="user.avatar" alt="user avatar"/>
      <h4>{{user.username}}</h4>
      <p>{{user.description}}</p>
    </div>
    <div class="tag-list">
      <router-link to="/group">我的小组</router-link>
      <router-link to="/calendar">会议日程</router-link>
      <router-link to="/setting">个人设置</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['user']
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
