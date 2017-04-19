<template>
  <div class="signPageWrap">
    <form class="signup-box">
      <input id="userId" type="text" placeholder="登录名/邮箱名">
      <input id="userNickname" type="text" placeholder="昵称">
      <input id="userPassword1" type="password" placeholder="密码">
      <input id="userPassword2" type="password" placeholder="确认密码">
      <div class="radio-form">
        <label class="gender-label">
          <input id="male" class="gender-radio" type="radio" name="gender" value="1">
          男
        </label>
        <label class="gender-label">
          <input id="female" class="gender-radio" type="radio" name="gender" value="0">
          女
        </label>
      </div>
      <textarea placeholder="自我介绍"></textarea>
      <button class="submit-button" type="submit">注 册</button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  input {
    border-radius: 18px;
    height: 28px;
    width: 200px;
    margin: 6px;
    padding: 2px 18px;
  }

  input[type=radio], label {
    width: 30px;
    height: 20px;
    margin: 6px;
    padding: 0;
    font-size: 15px;
  }

  .gender-label {
    margin-left: 20px;
    margin-right: 20px;
    vertical-align: middle;
  }

  .gender-radio {
    vertical-align: middle;
    margin-top: -2px;
  }

  textarea {
    width: 238px;
    height: 150px;
    border-radius: 5px;
    padding: 5px 8px;
    margin-top: 5px;
    resize: none;
  }

  .signPageWrap {
    width: 100%;
    min-width: 450px;
    height: 560px;
  }

  .signup-box {
    float: right;
    height: 100%;
    width: 30%;
    min-width: 300px;
    background-color: rgb(241, 244, 228);
    display: flex
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
