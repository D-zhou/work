<template>
  <div class="top-bar">
    <p class="hearder">预约管理</p>
    <div class="navbar">
      <img class="navbar-img" src="@/assets/img/fengxian_logo@2x.png" alt="" />
      <p class="phone-no">{{ userInfo.username }}</p>
      <img class="turn-off" src="@/assets/img/icon_exit@2x.png" alt="" @click="logout" />
    </div>
  </div>
</template>

<script>
import cookie from "@/utils/cookie";
export default {
  name: "TopBar",
  data() {
    return {
      show: false,
    };
  },
  created() {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    logout() {
      cookie.clearCookies();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  box-sizing: border-box;
  .hearder {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #ffffff;
  }
  .navbar {
    width: 100%;
    height: 188px;
    padding: 0 100px;
    box-sizing: border-box;
    background-image: url("../assets/img/img_bg@2x.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .navbar-img {
      width: 112px;
    }
    .turn-off {
      width: 48px;
    }
    .phone-no {
      width: 400px;
      font-family: PingFangSC-Semibold;
      font-size: 40px;
      color: #ffffff;
      letter-spacing: -0.48px;
    }
  }
}
</style>
