<template>
  <div class="container">
    <!-- <div class="select-box">
      <p class="select-value"></p>
      <ul class="select-list">
        <li class="select-item" v-for="item in activityList" :key="item.id">{{item.name}}</li>
      </ul>
    </div> -->
    <van-form class="van-form" @submit="onSubmit">
      <van-field
        clickable
        name="picker"
        :value="activity"
        label="活动名称："
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="activityList"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        class="van-field"
        v-model="formData.name"
        name="姓名："
        label="姓名："
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        class="van-field"
        v-model="formData.phone_number"
        name="手机号"
        label="手机号："
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        class="van-field"
        v-model="formData.card_number"
        name="身份证号"
        label="身份证号："
        placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />
      <van-field
        class="van-field"
        v-model="formData.company_name"
        name="单位名称"
        label="单位名称："
        placeholder="请输入单位名称"
        :rules="[{ required: true, message: '请填写单位名称' }]"
      />
      <div style="margin: 16px">
        <van-button class="submit" round block type="info" native-type="submit">
          提交预约
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { activityList, addRecord } from "@/api/api-activity";
import timeLinear from "@/utils/time-linear";
const initialForm = () => ({
  activity_id: "",
  name: "",
  phone_number: "",
  card_number: "",
  company_name: "",
});

export default {
  name: "dashboard",
  data() {
    return {
      formData: initialForm(),
      activityList: [],
      showPicker: false,
      activity: "",
    };
  },
  created() {
    this.getActivityList();
  },
  methods: {
    async onSubmit() {
      const params = Object.assign(this.formData);
      try {
        const data = await addRecord(params);
        if (data.rsCode == 200) {
          this.$toast({
            message: '<p style="padding: 0 10px">添加成功</p>',
            type: "html",
            position: "top",
          });
        } else {
          this.$toast({
            message: '<p style="padding: 0 10px">添加失败</p>',
            type: "html",
            position: "top",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    onConfirm(value) {
      this.activity = value.name;
      this.formData.activity_id = value.id.toString();
      this.showPicker = false;
    },
    async getActivityList() {
      try {
        const data = await activityList();
        if (data.rsCode == 200) {
          this.activityList = data.rsData.data.map((item) =>
            Object.assign(item, {
              text: item.name,
            })
          );
          this.activity = data.rsData.data[0].name;
          this.formData.activity_id = data.rsData.data[0].id.toString();
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
  width: 100%;
  height: calc(100vh - 380px);
  padding-top: 10px;
  box-sizing: border-box;
  background: #f8f8f8;
  .van-form .van-field {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    height: 88px;
    line-height: 88px;
    padding: 0 60px;
    color: #222222;
    letter-spacing: -0.38px;
  }
  .submit {
    width: 480px;
    height: 76px;
    margin: 200px auto 0;
    font-family: PingFangSC-Regular;
    font-size: 34px;
    color: #ffffff;
    letter-spacing: -0.41px;
    text-align: center;
  }
}
</style>
