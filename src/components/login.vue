<template>
  <div class="loginPageWrap">
    <form class="login-box">
      <input name="userId" type="text" placeholder="登录名/邮箱名">
      <input id="userPassword" type="password" placeholder="请输入密码">
      <button class="submit-button" type="submit">登 录</button>
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
    margin: 12px;
    padding: 2px 18px;
  }

  .loginPageWrap {
    width: 100%;
    min-width: 450px;
    height: 560px;
  }

  .login-box {
    float: right;
    height: 100%;
    width: 30%;
    min-width: 300px;
    background-color: #f1f4e4;
    display: flex
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
