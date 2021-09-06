<template>
  <view class="content">
    <!-- 修改头像 -->
    <view class="edit-image">
      <view class="text">头像</view>
      <view class="image">
        <view class="userAvatar" @tap="addImage">
          <image :src="img" style="height: 100%; width: 100%"></image>
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
    <view class="edit-left-box">
      <view class="edit-left-box-text">性别</view>
      <picker
        :value="sex"
        :range="genderArray"
        range-key="name"
        @change="changeSex"
      >
        <view class="flex">
          <text>{{ genderArray[sex || 0] }}</text>
          <view class="iconfont"><text class="iconfont">&#xe616;</text></view>
        </view>
      </picker>
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
    <!-- <view @click="quit">去掉token</view> -->
  </view>
</template>

<script>
import { baseUrl } from "../../config/env"; // 引入公共配置
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      img: "/static/default.jpg", // 用来在前端展示的图片，如上面图片中显示的一样
      src1: "", // 提交到后台的图片信息
      username: "阿珊~",
      birth_day: "2000-01-17",
      brief: "前端工程师，蓝桥签约作者",
      genderArray: ["男", "女"],
      sex: 0,
      gender: "",
    };
  },

  computed: mapState(["token", "user"]), // 拿值

  onLoad() {
    this.getData();
  },
  methods: {
    ...mapActions(["updateUser"]), // 拿方法
    getData() {
      this.img = baseUrl + this.user.img;
      this.username = this.user.nackname;
      this.sex = this.user.sex;
      this.birth_day = this.user.birth_day;
      this.brief = this.user.brief;
    },

    // quit(){
    //   console.log("去掉token")
    //   uni.navigateTo({
    //       url: '/pages/login/login'
    //   });
    // },

    addImage() {
      var that = this;
      // 从本地相册选择图片或使用相机拍照。
      uni.chooseImage({
        count: 1, //最多可以选择的图片张数，默认9
        //album 从相册选图，camera 使用相机，默认二者都有。
        sourceType: ["album"],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          uni.uploadFile({
            url: baseUrl + "/uploadUser",
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              user: "test",
            },
            success: function (uploadFileRes) {
              //获取图片信息 网站域名 + res1.data.url就是一个图片的完整路径了
              var res1 = JSON.parse(uploadFileRes.data);
              that.src1 = res1.url;
              that.updateUserData("img", res1.url);
            },
          });
        },
      });
    },

    changeUserName() {
      wx.showModal({
        title: "提示",
        content: "这是一个模态弹窗",
        editable: true,
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    changeSex(e) {
      // 调用封装好的更新函数传入值
      this.updateUserData("sex", e.detail.value);
    },
    changeBirth() {},
    changeBrief() {},

    /**
     * 封装请求更新用户数据函数
     * @param name string 更新数据的名称
     * @param data any 需要更新的数据
     */
    updateUserData(name, data) {
      let updateData = {};
      updateData[name] = data;
      uni.request({
        url: "/updateUser",
        method: "POST",
        data: {
          ...updateData,
        },
        header: {
          token: this.token,
        },
        success: (res) => {
          if (res.data.code == 1) {
            this[name] = data;
            this.updateUser([{ name, data }]);
            this.$cookies.set("userData", JSON.stringify(this.user));
          }
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000,
          });
        },
        fail: (err) => {
          console.log(err.data);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 原子性
.flex {
  display: flex;
  align-items: center;
}
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
