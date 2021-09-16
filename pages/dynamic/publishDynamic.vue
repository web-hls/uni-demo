<template>
    <view class="publish-dynamic-box">
      <view class="my-dynamic">
        <view class="publish-button" @click="publishDynamic">发布</view>
      </view>
      <view class="publish-content">
        <textarea 
          class="textarea"
          placeholder="这一刻的想法..."
          v-model="content"
          maxlength	= "80"
        />
        <view style="opacity:0">1</view>
        <view class="uploadsImage" @tap="addImage">
          <image v-if="image" :src="image" style="height: 100%; width: 100%"></image>
          <text v-else class="iconfont">&#xe623;</text>
        </view>
        <!-- <el-upload
          class="pictrue-uploader"
          a ction="http://123.57.158.140:7001/uploadUser"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i
            v-if="image"
            :src="image"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus pictrue-uploader-icon"
          ></i>
        </el-upload> -->
      </view>
    </view>
</template>

<script>
import { baseUrl } from "../../config/env"; // 引入公共配置

import { mapActions,mapState } from "vuex";
export default {
  data() {
    return {
        id: "",
        icon:'&#xe609;',
        image: "",
        content: "",
        img: "/static/default.jpg", // 用来在前端展示的图片，如上面图片中显示的一样
        src1: "", // 提交到后台的图片信息
    }
  },
  computed: mapState(["token", "user"]), // 拿值

  onLoad(){
    this.id = this.user.id
    console.log("this.id",this.id)
    console.log("this.user.id",this.user.id)
  },
  methods: {
    ...mapActions(["updateUser"]), // 拿方法

    addImage() {
      var that = this;
      // 从本地相册选择图片或使用相机拍照。
      uni.chooseImage({
        count: 9, //最多可以选择的图片张数，默认9
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
    publishDynamic(){
      // if (this.content == "") {
      //   Toast({
      //     message: "请输入这一刻的想法...",
      //     position: "middle",
      //     duration: 3000,
      //   });
      //   return;
      // }
      // this.$http({
      //   url: "/savePublish", // 请求地址
      //   method: "post", // 设置请求方式
      //   data: {
      //     user_id: this.$store.getters["user/id"],
      //     img: this.image,
      //     content: this.content,
      //   },
      // })
      //   .then((e) => {
      //     // 处理请求返回的结果
      //     console.log(e.data);
      //     Indicator.close();
      //     if (e.data.code === "1") {
      //       console.log(this.image);
      //       Toast({
      //         message: "动态发布成功",
      //         position: "middle",
      //         duration: 3000,
      //       });
      //       this.$router.push({
      //         name: "dynamic",
      //       });
      //     } else {
      //       Toast({
      //         message: "动态发布失败",
      //         position: "middle",
      //         duration: 3000,
      //       });
      //     }
      //   })
      //   .catch((res) => {
      //     Indicator.close();
      //     Toast({
      //       message: "发布失败",
      //       position: "middle",
      //       duration: 3000,
      //     });
      //   });
    },
    
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
  }
}

</script>

<style lang="scss" scoped>
.publish-dynamic-box {
  height: 100%;
  background: #f7e8d5;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 44px;
  .my-dynamic {
    display: flex;
    justify-content: flex-end;
    font-size: 36rpx;
    font-weight: 700;
    .publish-button {
      padding: 20rpx 40rpx;
      border-radius: 20rpx;
      background: rgb(243, 189, 88);
      margin-right: 48rpx;
    }
  }
  .publish-content {
    margin: 40rpx 0rpx;
    height: 300rpx;
    .textarea {
      margin: 10rpx 20rpx;
      margin-top: 40rpx;
      padding: 10rpx 6rpx;
      text-indent:1em;
      height: 300rpx;
      background: white;
      text-align: justify;
      opacity: 0.8;
    }
  }
  .uploadsImage {
    // width: 228rpx;
    // height: 228rpx;
    margin: 40rpx 20rpx;
    margin-bottom: 50rpx;
    > image {
      border-radius: 20rpx;
    }
    .iconfont {
      font-size: 108rpx;
      opacity: 0.5;
      border: 1rpx solid #5e6d82;
      padding: 36rpx;
      border-radius: 20rpx;
    }
  }
}
</style>