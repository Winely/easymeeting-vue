<template>
  <div class="screen-view">
    <section id="main-section">
      <div id="settings-container">
        <input class="btn" type="button" id="call_but" value="Call" disabled><br><!----这个button是发起视频的---->
      </div>
      <div id="video-container">
        <video id="self_view" class="shadow owr-overlay-video" autoplay muted></video>
        <video id="remote_view" class="shadow owr-overlay-video" autoplay></video>
      </div><!----这个地方是放视频的---->
      <div id="chat_div"></div>
      <div id="chat-container">
        <input type="sendtext" id="chat_txt" disable placeholder="Type here">
        <input type="button" class="btn" id="chat_but" value="Send">
      </div><!----这个地方是放聊天窗口的---->
      <div id="log_div"></div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'assets/main'
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
