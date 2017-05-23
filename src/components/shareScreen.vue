<template>
  <div class="share">
    <div id="share-screen"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created () {
      var path = "123.206.123.213:3001";
//      path = "localhost:3001";//这里是服务器地址
      var socket = io.connect(path);
      socket.on('broadcast', function (data) {
        if (data.id != socket.id) {
          var image = new Image();
          image.onload = function () {
            //样式请在这里改
            var newVideo = document.getElementById("other-" + data.id);
            if (newVideo == null) {
              newVideo = document.createElement("canvas");
              newVideo.setAttribute("id", "other-" + data.id);
              newVideo.setAttribute("width", '100%');
              newVideo.setAttribute("height", '100%');
            }
            newVideo.setAttribute("class", "other");
            newVideo.getContext('2d').drawImage(image, 0, 0, '100%', '100%');
            this.$el.appendChild(newVideo);
          };
          image.src = data.data;
          if (data.data == null) {
            image.src = url("这里放一张穿透服务器错误的图片");
          }
        }
      });
      socket.on('user disconnected', function (data) {
        var e = document.getElementById('other-' + data);
        if (e) {
          e.parentNode.removeChild(e);
        }
      });
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
