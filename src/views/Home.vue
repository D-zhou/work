<template>
  <div class="home">
    <TopBar class="top-bar" />
    <ul class="tabs">
      <li
        v-for="item in tabs"
        :key="item.value"
        :class="['tab', item.value == activeIndex ? 'active' : '']"
        @click="gotoPath(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="view-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import TabBar from 'components/TabBar.vue';
import TopBar from "components/TopBar.vue";

export default {
  name: "Home",
  components: { TopBar },
  data() {
    return {
      tabs: [
        {
          label: "新增预约信息",
          value: "dashboard",
        },
        {
          label: "新增记录",
          value: "follow",
        },
      ],
    };
  },
  created() {
    this.activeIndex = this.$route.name;
  },
  methods: {
    gotoPath(val) {
      this.activeIndex = val;
      if (val == 'dashboard') {
        this.$router.push({ path: "/dashboard" });
      } else if (val == 'follow') {
        this.$router.push({ path: "/follow" });
      }
    },
  },
};
</script>
<style lang="less" scope>
.top-bar {
  z-index: 999;
}
.tabs {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background: #ffffff;
  .tab {
    width: 50%;
    height: 100%;
    line-height: 72px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #9b9b9b;
    letter-spacing: -0.38px;
    text-align: center;
    position: relative;
  }
  .tab.active {
    color: #292f4c;
    &::after {
      display: block;
      content: "";
      width: 72px;
      height: 4px;
      background: #c52922;
      border-radius: 2px;
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
