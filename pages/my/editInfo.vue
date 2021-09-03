<template>
  <view class="content">
    <!-- 修改头像 -->
    <view class="edit-image">
      <view class="text">头像</view>
      <view class="image">
        <view class="userAvatar" @tap="addImage">
          <image :src="src" style="height: 100%; width: 100%"></image>
        </view>
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
    <view class="tansition-line"></view>
    <!-- 昵称 -->
    <view class="edit-left-box" @click="changeUserName">
      <view class="edit-left-box-text">昵称</view>
      <view class="right-value"
        >{{ username }}
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
    <view class="tansition-line"></view>
    <!-- 性别 -->
    <view class="edit-left-box" @click="changeSex">
      <view class="edit-left-box-text">性别</view>
      <view class="right-value" v-if="sex == 0"
        >男
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
      <view class="right-value" v-else
        >女
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
    <view class="tansition-line"></view>
    <!-- 出生日期 -->
    <view class="edit-left-box" @click="changeBirth">
      <view class="edit-left-box-text">出生年月</view>
      <view class="right-value"
        >{{ birth_day }}
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
    <view class="tansition-line"></view>
    <!-- 个性签名 -->
    <view class="edit-left-box" @click="changeBrief">
      <view class="edit-left-box-text">个性签名</view>
      <view class="right-value-"
        >{{ brief }}
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { baseUrl } from "../../config/env"; // 引入公共配置
import { mapActions,mapState } from "vuex";

export default {
  data() {
    return {
      src: "/static/default.jpg", // 用来在前端展示的图片，如上面图片中显示的一样
      src1: "", // 提交到后台的图片信息
      username: "阿珊~",
      sex: 1,
      birth_day: "2000-01-17",
      brief: "前端工程师，蓝桥签约作者",
    };
  },

  computed: mapState(["token", "user"]), // 拿值

  onLoad() {
    this.getData();
  },
  methods: {
    ...mapActions(["updateUser"]), // 拿方法
    getData() {
      this.src = baseUrl + this.user.img;
      this.username = this.user.nackname;
      this.sex = this.user.sex;
      this.birth_day = this.user.birth_day;
      this.brief = this.user.brief;
    },

    addImage() {
      var that = this;
      // 从本地相册选择图片或使用相机拍照。
      uni.chooseImage({
        count: 1, //最多可以选择的图片张数，默认9
        //album 从相册选图，camera 使用相机，默认二者都有。
        sourceType: ["album"],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: baseUrl + "/uploadUser",
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              user: "test",
            },
            success: function (uploadFileRes) {
              console.log(uploadFileRes);
              //获取图片信息 网站域名 + res1.data.url就是一个图片的完整路径了
              var res1 = JSON.parse(uploadFileRes.data);
              // that.src = baseUrl + res1.url;
              that.src1 = res1.url
              uni.request({
                url: "/updateUser",
                method: "POST",
                data: {
                  img: res1.url,
                },
                header: {
                  token: that.token,
                },
                success: function (res1) {
                  if(res1.data.code == 1) {
                    that.updateUser([{name:'img', data: that.src1}])
                    that.src = that.src1
                    that.$cookies.set("userData" , JSON.stringify(that.user))
                  }
                  uni.showToast({
                    title: res1.data.msg,
                    icon: "none",
                    duration: 3000,
                  });
                },
              });
            },
          });
        },
      });
    },

    changeUserName() {
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        editable: true,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    changeSex() {},
    changeBirth() {},
    changeBrief() {},
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background: #f7e8d5;
  position: fixed;
  overflow-y: scroll;
  // top: 0;
  left: 0;
  right: 0;
  // bottom: 0;
}
.edit-image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 20rpx 0;
  .text {
    margin-left: 30rpx;
    font-size: 32rpx;
  }
  .image {
    margin-right: 30rpx;
    display: flex;
    align-items: center;
    .userAvatar {
      width: 128rpx;
      height: 128rpx;
      border-radius: 80rpx;
      margin: 20rpx;
      // background: #f7e8d5;
      > image {
        border-radius: 80rpx;
      }
    }

    .avatar-uploader {
      .avatar {
        width: 128rpx;
        height: 128rpx;
        border-radius: 80rpx;
        margin: 20rpx;
        background: #f7e8d5;
      }
      > img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 80rpx;
        margin: 20rpx;
      }
    }
    > img {
      width: 128rpx;
      height: 128rpx;
      border-radius: 80rpx;
      margin: 20rpx;
    }
    .iconfont {
      font-size: 60rpx;
      color: #999;
    }
  }
}
.tansition-line {
  border: 0.01rpx solid rgb(230, 229, 229);
  background: white;
}
.edit-left-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 20rpx 0;
  .edit-left-box-text {
    margin-left: 30rpx;
    font-size: 32rpx;
  }
  .right-value {
    margin-right: 30rpx;
    display: flex;
    align-items: center;
  }
  .right-value- {
    margin-right: 30rpx;
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .iconfont {
    font-size: 60rpx;
    color: #999;
  }
}
</style>
