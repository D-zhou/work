<template>
  <div class="container">
    <div class="input-box">
      <van-Field
        shape="round"
        class="search-input"
        v-model="keyword"
        placeholder="请输入搜索关键词"
      />
      <van-button class="enter-btn" type="info" @click="getRecordList(1)"
        >确定</van-button
      >
    </div>

    <van-list
      class="list"
      finished-text="没有更多了"
      :finished="finished"
      v-model="loading"
      @load="onLoad"
    >
      <van-swipe-cell class="list-item" v-for="item in list" :key="item.id">
        <van-row class="item-row">
          <van-col span="6">姓名：</van-col>
          <van-col span="18">{{ item.name }}</van-col>
        </van-row>
        <van-row class="item-row">
          <van-col span="6">手机号：</van-col>
          <van-col span="18">{{ item.mobile }}</van-col>
        </van-row>
        <van-row class="item-row">
          <van-col span="6">身份证号：</van-col>
          <van-col span="18">{{ item.id_card }}</van-col>
        </van-row>
        <van-row class="item-row">
          <van-col span="6">单位名称：</van-col>
          <van-col span="18">{{ item.company_name }}</van-col>
        </van-row>
        <div class="right-btb" @click="showModal(item.id)">取消预约</div>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { recordList, concalPre } from "@/api/api-activity";
import { Dialog } from "vant";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      finished: false,
      keyword: "",
      list: [],
      page: 1,
      total: 0,
    };
  },
  created() {
    this.getRecordList();
  },
  methods: {
    onLoad() {
      let page = ++this.page;
      console.log(page);
      if (page <= this.total) {
        this.getRecordList(page);
      } else {
        this.finished = true;
      }
    },
    async getRecordList(page = 1) {
      this.loading = true;
      const params = { pageIndex: page, keyword: this.keyword };
      try {
        const data = await recordList(params);
        if (data.rsCode == 200) {
          this.total = data.rsData.total_page;
          this.list = this.list.concat(data.rsData.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    showModal(id) {
      Dialog.confirm({
        width: 320,
        className: "my-dialog",
        allowHtml: true,
        title: "提示",
        message: "<p style='lineHeight: 60px'>确定取消当前预约？</p>",
      })
        .then(() => {
          // on confirm
          this.handleConcalPre(id);
        })
        .catch(() => {
          // on cancel
        });
    },
    async handleConcalPre(id) {
      try {
        const data = await concalPre({ id, data: { is_cancel: true } });
        if (data.rsCode == 200) {
          this.list = [];
          this.getRecordList();
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: calc(100vh - 380px);
  background: #f8f8f8;
  padding: 40px 60px 0;
  box-sizing: border-box;
  .input-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .search-input {
      width: 512px;
      height: 76px;
      padding: 0 100px;
      box-sizing: border-box;
      border-radius: 38px;
      font-family: PingFangSC-Regular;
      line-height: 76px;
      font-size: 28px;
      color: #cccccc;
      letter-spacing: -0.34px;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        display: block;
        content: "";
        width: 68px;
        height: 64px;
        background-image: url("../../assets/img/icon_search_normal@2x.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      //   &::after {
      //     position: absolute;
      //     top: 50%;
      //     left: 85%;
      //     transform: translateY(-50%);
      //     display: block;
      //     content: "";
      //     width: 56px;
      //     height: 56px;
      //     background-image: url("../../assets/img/icon_closed@2x.png");
      //     background-repeat: no-repeat;
      //     background-size: cover;
      //   }
    }
    .enter-btn {
      width: 140px;
      height: 76px;
      border-radius: 38px;
      font-family: PingFangSC-Regular;
      font-size: 34px;
      color: #ffffff;
      letter-spacing: -0.41px;
      text-align: center;
    }
  }
  .list {
    .list-item {
      font-size: 30px;
      line-height: 50px;
      box-sizing: border-box;
      background-color: #ffffff;
      padding: 20px;
      padding-right: 0;
      margin-bottom: 30px;
      position: relative;
      .item-row {
        margin: 10px;
        line-height: 50px;
      }
      .right-btb {
        width: 140px;
        height: 56px;
        line-height: 56px;
        position: absolute;
        top: 0;
        right: 40px;
        border: 1px solid #c52922;
        border-radius: 28px;
        text-align: center;
      }
    }
  }
}
</style>
