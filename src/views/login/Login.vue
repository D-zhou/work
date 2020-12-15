<template>
  <div class="container">
    <div class="logo-box">
      <img class="logo-img" src="@/assets/img/img_logo@2x.png" alt="" />
      <p class="logo-title">上海市奉贤区血站预约平台</p>
      <p class="logo-des">Shanghai Fengxian District Blood Station</p>
    </div>
    <van-form class="login-form" @submit="onSubmit">
      <h2 class="form-title">登录</h2>
      <van-field
        class="login-input input-phone"
        v-model="username"
        name="用户名"
        placeholder="请输入手机号"
      />
      <van-field
        class="login-input input-password"
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
      />
      <div style="margin: 20px">
        <van-button round block type="info" size="large" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="bg"></div>
  </div>
</template>

<script>
import cookie from "@/utils/cookie";
import { login, getUserInfo } from "@/api/api-login";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {},
  methods: {
    async getUserInfo() {
      try {
        const data = await getUserInfo();
        if (data.rsCode == 200) {
          this.$store.commit({
            type: "getUserInfo",
            userInfo: data.rsData,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit() {
      const params = {
        username: this.username,
        password: this.password,
      };
      try {
        const data = await login(params);
        if (data.rsCode == 200) {
          cookie.setCookies({ usertoken: data.rsData.token });
          cookie.setCookies({ choose_user_type: data.rsData.user_type });
          this.getUserInfo();

          this.$toast({
            message: '<p style="padding: 0 10px">登录成功</p>',
            type: "html",
            position: "top",
          });
          setTimeout(() => {
            this.$router.push({ path: "/dashboard" });
          }, 2000);
        } else {
          this.$toast({
            message: `<p style="padding: 0 10px">${data.msg}</p>`,
            type: "html",
            position: "top",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: rgb(108, 214, 242);
  overflow: hidden;

  .logo-box {
    width: 100%;
    margin-top: 100px;
    text-align: center;
    .logo-img {
      width: 168px;
      height: 168px;
    }
    .logo-title {
      font-family: PingFangSC-Medium;
      font-size: 34px;
      color: #ffffff;
    }
    .logo-des {
      font-family: PingFangSC-Light;
      font-size: 24px;
      color: #ffffff;
      text-align: center;
    }
  }

  .login-form {
    width: 680px;
    height: 680px;
    margin: 100px auto 0;
    background-color: rgb(255, 255, 255);
    padding: 50px;
    box-sizing: border-box;
    border-radius: 24px;
    .form-title {
      font-family: PingFangSC-Medium;
      font-size: 48px;
      color: #4a4a4a;
      text-align: center;
    }
    .login-input {
      line-height: 80px;
      color: #000000;
      padding-left: 80px;
      font-size: 30px;
      position: relative;
      &::after {
        display: block;
        content: "";
        width: 48px;
        height: 48px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        background-image: url(../../assets/img/icon_account@2x.png);
        background-repeat: no-repeat;
        background-size: 48px 48px;
      }
    }
    .input-password::after {
      display: block;
      content: "";
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      background-image: url(../../assets/img/icon_password@2x.png);
      background-repeat: no-repeat;
      background-size: 48px 48px;
    }

    .van-button--large {
      height: 80px;
      margin-top: 100px;
    }
  }
}
</style>
