<template>
    <view class="publish-dynamic-box">
      <view class="my-dynamic">
        <view class="publish-button" @click="publishDynamic">发布</view>
      </view>
      <view class="publish-content">
        <textarea 
          @blur="bindTextAreaBlur" 
          class="content" 
          v-model="content"
          placeholder="这一刻的想法..."
          auto-height />
        <view style="opacity:0">1</view>
        <view class="uploadsImage" @tap="addImage">
          <image v-if="image" :src="image" style="height: 100%; width: 100%"></image>
          <text v-else class="iconfont">&#xe623;</text>
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
      id: "",
      image: "",
      content: "",
      img: "/static/default.jpg", // 用来在前端展示的图片，如上面图片中显示的一样
      src1: "", // 提交到后台的图片信息
    }
  },
  computed: mapState(["token", "user"]), // 拿值

  onLoad(){
    this.id = this.user.id
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
    bindTextAreaBlur(e){
       console.log(e.detail.value)
    },
    publishDynamic(){
      if (!this.content) {
         return uni.showToast({
            title: "请输入内容",
            icon: "none",
            duration: 3000,
         });
      }
      uni.request({
        url: "/saveDynamic",
        method: "POST",
        data: {
          user_id: this.id,
          img: this.image,
          content: this.content,
        },
      }).then(res=>{
         console.log(res)
         if (res[1].data.code === "1"){
            uni.showToast({
               title: "动态发布成功",
               duration: 3000,
            });
            uni.navigateTo({
					url: "/pages/dynamic/dynamic",
				});
         } else {
            uni.showToast({
               title: "动态发布失败",
               icon: 'none',
               duration: 3000,
            });
         }
      }).catch(err=>{
         console.log(err)
      })
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
    margin: 40rpx 24rpx;
    padding: 20rpx 10rpx 10rpx 10rpx; 
    height: 550rpx;
    .content {
      text-indent:1em; // 首行缩进
      text-align: justify; // 两端对齐
    }
  }
  .uploadsImage {
    margin: 10rpx 0rpx;
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