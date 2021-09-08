<template>
  <view class="content-box">
    <!-- 上半部分：头像、昵称、简介、编辑资料入口 -->
    <view class="basic-info">
      <view class="basic-info-left">
        <view class="image">
          <image class="user__avatar" :src="img"></image>
        </view>
        <view class="nackname">
          <text class="name fw">{{ user.nackname }}</text>
          <view class="brief">{{ user.brief }}</view>
        </view>
      </view>
      <view class="basic-info-right" @click="toEditInfo">
        <text class="icon">&#xe612;</text>
      </view>
    </view>
    <!-- 中间部分 -->
    <view class="action-idol-fans">
      <view class="action">
        <view class="fw">动态</view>
        <view style="text-align: center">111</view>
      </view>
      <view class="line"></view>
      <view class="idol">
        <view class="fw">关注</view>
        <view style="text-align: center">222</view>
      </view>
      <view class="line"></view>
      <view class="fans">
        <view class="fw">粉丝</view>
        <view style="text-align: center">333</view>
      </view>
    </view>
    <!-- 开通会员 -->
    <view class="member-set">
      <view class="open-member">
        <view class="left">
          <text class="iconfont">&#xe680;</text>
          <view style="margin-left: 0.5rem">开通会员</view>
        </view>
        <view class="buttom-text">
          <view>查看特权</view>
        </view>
      </view>
    </view>
    <!-- 离线缓存  历史记录  我的收藏  稍后再看 -->
    <view class="vedio-box">
      <view class="vedio-cache">
        <view>
          <text class="iconfont">&#xe60e;</text>
        </view>
        <view>离线缓存</view>
      </view>
      <view class="history-record">
        <view>
          <text class="iconfont">&#xe608;</text>
        </view>
        <view>历史记录</view>
      </view>
      <view class="my-like">
        <view>
          <text class="iconfont">&#xe61a;</text>
        </view>
        <view>我的收藏</view>
      </view>
      <view class="later-watch">
        <view>
          <text class="iconfont">&#xe6c0;</text>
        </view>
        <view>稍后再看</view>
      </view>
    </view>
    <!-- 更多服务 -->
    <view class="more-serve">
      <view class="text">更多服务</view>

      <view class="content">
        <view>我的计划</view>
        <view><text class="iconfont">&#xe616;</text></view>
      </view>

      <view class="content">
        <view>我的动态</view>
        <view><text class="iconfont">&#xe616;</text></view>
      </view>

      <view class="content">
        <view>我的信息</view>
        <view><text class="iconfont">&#xe616;</text></view>
      </view>

      <view class="content" @click="goToSet">
        <view>设置</view>
        <view><text class="iconfont">&#xe616;</text></view>
      </view>
    </view>
    <!-- 底部过渡 -->
    <view style="margin-bottom: 100rpx"></view>
  </view>
</template>
<!--  <button type="primary" @click="goto('/pages/index/index')">
			  通过方法跳转到首页
		  </button> -->

<script>
import { baseUrl } from "../../config/env";
import { mapState } from "vuex";
export default {
  data() {
    return {
      img: "/static/default.jpg",
    };
  },
  computed: mapState(["user"]),
  onLoad() {
	  console.log(this.user)
    if(this.user.img != "/static/default.jpg") { this.img = baseUrl + this.user.img }
  },
  activated() {
    if(this.user.img != "/static/default.jpg") { this.img = baseUrl + this.user.img }
  },
  methods: {
    toEditInfo() {
      uni.navigateTo({
        url: "/pages/my/editInfo",
      });
    },
    goto(url) {
      uni.switchTab({
        url: url,
      });
    },
    goToSet(){
      uni.navigateTo({
        url:'pages/my/set'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  // height: 100% - calc(44px + env(safe-area-inset-top));
  height: 100%;
  background: #f7e8d5;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .basic-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .basic-info-left {
    display: flex;
    align-items: center;
    width: 90%;
  }
  .image {
    padding: 50px 20px;
    width: $uni-img-size-lg;
    height: $uni-img-size-lg;
  }
  .user__avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
  }
  .nackname {
    margin: 40rpx 0rpx 10rpx 20rpx;
  }
  .name {
    font-size: 35rpx;
  }
  .brief {
    font-size: 30rpx;
    width: 500rpx;
    margin-top: 10rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .basic-info-right {
    width: 10%;
  }
  .icon {
    font-size: 48rpx;
    margin-right: 40rpx;
    padding-right: 20rpx;
  }
  // middle
  .action-idol-fans {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 35rpx;
    margin-top: -15rpx;
    .action {
      margin-left: 20rpx;
    }
    .fans {
      margin-right: 20rpx;
    }
    .line {
      border: 1rpx solid grey;
      height: 90rpx;
    }
  }
  // huiyuan
  .member-set {
    display: flex;
    align-items: center;
    justify-content: center;
    .open-member {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgb(239, 179, 54);
      background: rgb(86, 79, 68);
      margin-top: 20rpx;
      width: 85%;
      padding: 20rpx;
      font-size: 30rpx;
      border-top-left-radius: 40rpx;
      border-top-right-radius: 40rpx;
      .iconfont {
        color: rgb(239, 179, 54);
        font-size: 40rpx;
        margin-left: 20rpx;
      }
      .left {
        display: flex;
        align-items: center;
        margin-left: 3rpx;
      }
      .buttom-text {
        margin-right: 30rpx;
        background: rgb(239, 179, 54);
        color: rgb(86, 79, 68);
        border-radius: 30rpx;
        padding: 15rpx 20rpx;
      }
    }
  }
  // jingtai
  .vedio-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    background: white;
    padding: 20rpx 10rpx;
    .iconfont {
      font-size: 50rpx;
      padding-bottom: 20rpx;
      color: rgb(46, 153, 207);
    }
  }
  // footer
  .more-serve {
    .text {
      font-weight: bold;
      margin: 38rpx 0 20rpx 20rpx;
      font-size: 40rpx;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: gray;
      margin: 12px 0px 0px 12px;
      font-size: 38rpx;
      .iconfont {
        margin-right: 40rpx;
        font-size: 60rpx;
      }
    }
    .line {
      border: 1rpx solid gray;
      margin: 30rpx 0;
    }
  }
  .fw {
    font-weight: bold;
  }
}
</style>
