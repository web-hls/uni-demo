<template>
    <view class="app">
      <view class="my-dynamic">
        <view class="publish-button" @click="publishDynamic">发布</view>
      </view>
      <view class="publish-content">
        <input
          placeholder="这一刻的想法..."
          type="textarea"
          rows="4"
          v-model="content"
        />
        <!-- <el-upload
          class="avatar-uploader"
          a ction="http://123.57.158.140:7001/uploadUser"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="image"
            :src="image"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload> -->
      </view>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         // id: this.user.id,
         content: "",
         image: "",
      }
   },
   computed: mapState(["user"]), // 拿值
   methods: {
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
   }
}

</script>

<style lang="scss" scoped>
.app {
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
    font-size: 1.2rem;
    height: 2.5rem;
    margin-top: 0.5rem;
    .publish-button {
      width: 80rpx;
      padding: 0.3rem 0.6rem;
      border-radius: 0.6rem;
      background: rgb(243, 189, 88);
      margin-right: 1rem;
    }
  }
  .publish-content {
    margin: 0.8rem auto;
    width: 90%;
    height: 20rem;
    background: white;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      // background: #000;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      background: rgb(241, 240, 238);
      margin-left: 1rem;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      margin-left: 1rem;
    }
  }
}
</style>