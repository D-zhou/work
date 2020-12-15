<template>
  <div class="tab-bar">
    <div class="item" @click="changeTab(0)">
      <router-link
        to="/dashboard"
        tag="span"
        :class="tabIndex === 0 ? 'active' : ''"
        >外采活动</router-link
      >
    </div>
    <div class="item" @click="changeTab(1)">
      <router-link
        to="/follow"
        tag="span"
        :class="tabIndex === 1 ? 'active' : ''"
        >献血者列表</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  height: 120px;
  line-height: 120px;
  width: 100%;
  background: #000000;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #cccccc;
  font-size: 20px;
  display: flex;
  justify-content: center;

  .item {
    flex: 1;
    text-align: center;
  }

  .active {
    color: #ffffff;
  }
}
</style>
