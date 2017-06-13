<template>
  <div class="screen-view">
    <section id="main-section">
      <div id="video-container">
        <video id="self_view" class="shadow owr-overlay-video" autoplay muted></video>
        <video id="remote_view" class="shadow owr-overlay-video" autoplay></video>
      </div><!----这个地方是放视频的---->
      <div id="chat_div"></div>
      <div id="chat-container">
        <input type="sendtext" id="chat_txt" disable placeholder="Type here">
        <button type="button" class="btn" id="chat_but">Send</button>
      </div><!----这个地方是放聊天窗口的---->
      <div id="settings-container">
        <!--<button  @click="run(groupId)">加入房间</button>-->
        <button class="btn" type="button" id="call_but">Call</button><br><!----这个button是发起视频的---->
      </div>
      <div id="log_div"></div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import run from 'assets/main2'
  export default {
    props: ['groupId'],
    mounted () {
      run(this.groupId)
    },
    methods: {
        run
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #video-container
    display flex
    video
      width 320px
</style>
