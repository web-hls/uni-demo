<template>
  <view class="app">
    <view class="app-top">
      <view class="text-">账号与安全</view>
      <view class="transition"></view>
      <view class="text-">新消息提醒</view>
      <view class="transition-"></view>
      <view class="text-">勿扰模式</view>
      <view class="transition-"></view>
      <view class="text-">聊天</view>
      <view class="transition-"></view>
      <view class="text-">隐私</view>
      <view class="transition-"></view>
      <view class="text-">设备</view>
      <view class="transition-"></view>
      <view class="text-">通用</view>
      <view class="transition"></view>
      <view class="text-">关于Cube自律空间</view>
      <view class="transition-"></view>
      <view class="text-">帮助与反馈</view>

      <!-- <el-button>退出登录</el-button> --> 
      <view class="button">
        <button
          @click="toLogin"
          class="button-inner"
          type="warning"
          >退出登录
        </button>
      </view>

    </view>
  </view>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {

    };
  },
  
  computed: mapState(["token", "user"]), // 拿值

  methods: {
    toLogin() {
      //销毁 token，跳到登录页面
      // localStorage.removeItem("Token");
      // this.$router.push({
      //   name: "login",
      // });
      this.$cookies.set("userData",null)
      uni.navigateTo({
        url:'/pages/login/login'
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  // background: rgb(253, 233, 235, 0.5);
  background: #f7e8d5;
  position: fixed;
  overflow-y: scroll;
  top: 90rpx;
  left: 0;
  right: 0;
  bottom: 0;
  .app-top {
    .text- {
      background: white;
      // height: 3rem;
      display: flex;
      align-items: center;
      // font-size: 1.2rem;
      font-size: 40rpx;
      
      border-bottom: 1rpx soild #E9E9E9;
      padding: 20rpx;
    }
    .transition {
      background: rgb(233, 227, 227);
      height: 20rpx;
    }
    .transition- {
      border: 1rpx solid #E9E9E9;
      background: #E9E9E9;
      // height: 0.5rem;
    }
    .text {
      font-weight: bold;
    }
  }
  .button {
    text-align: center;
    margin-top: 100rpx;
    width: 100%;
   
    .button-inner {
      background: rgba(230,162,60,0.8);
      color: white;
      width: 80%;
      font-size: 1.1rem;
    }
  }
}
</style>