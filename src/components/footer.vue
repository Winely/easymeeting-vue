<template>
  <footer>
    <section class="main-title">
      <svg viewBox="0 0 79.26 28.89" class="footer-icon">
        <use xlink:href="#icon"></use>
      </svg>
      <h3>EasyMeeting 会易</h3>
      <p>一个智障项目</p>
    </section>
    <section class="copyright">
      <h4>Tongji University</h4>
      <p>4800 Cao'an Highway, Jiading District,Shanghai 201804</p>
    </section>
    <section class="project">
      <h4>项目地址</h4>
      <p><a href="//github.com/Winely/easymeeting-vue">GitHub 仓库</a></p>
    </section>
    <section class="details">
      <h4>开发人员</h4>
      <ul>
        <li>冬菇</li>
        <li>胖妞</li>
        <li>冬菇</li>
        <li>胖妞</li>
      </ul>
    </section>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  footer
    background #333
    padding 30px
    display flex
    color #fff
    .main-title
      flex 1
    .project
      flex 1
    .copyright
      flex 1
    .details
      flex 1

  .footer-icon
    width 150px
</style>
