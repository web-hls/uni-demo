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
    <view class="edit-left-box">
      <view class="edit-left-box-text">昵称</view>
      <view class="right-value">
        <view>
          <input 
            type="text" 
            class="t_r" 
            @blur="changeUserName" 
            :value="username" 
            placeholder="请输入昵称" 
            placeholder-style="text-align:right"/>
        </view>
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
          <view class="iconfont m-r-24"><text class="iconfont">&#xe616;</text></view>
        </view>
      </picker>
    </view>
    <view class="tansition-line"></view>
    <!-- 出生日期 -->
    <view class="edit-left-box">
      <view class="edit-left-box-text">出生年月</view>
      <view class="flex">
        <view class="uni-list" style="text-align: right;">
            <view class="uni-list-cell" t_r>
              <view class="uni-list-cell-db t_r">
                <picker mode="date" class="t_r" :value="birth_day" :start="startDate" :end="endDate" @change="bindDateChange">
                  <view class="uni-input t_r">{{birth_day ? birth_day : birth_day_default}}</view>
                </picker>
              </view>
            </view>
          </view>
          <view class="right-value">
            <view class="iconfont">
              <text class="iconfont">&#xe616;</text>
            </view>
          </view>
      </view>
    </view>
    <view class="tansition-line"></view>
    <!-- 个性签名 -->
    <view class="edit-left-box">
      <view class="edit-left-box-text">个性签名</view>
      <view class="right-value-">
        <view>
          <input 
            type="text" 
            class="t_r" 
            @blur="changeBrief" 
            :value="brief" 
            placeholder="请输入个性签名"
            placeholder-style="text-align:right"/>
        </view>
        <view class="iconfont">
          <text class="iconfont">&#xe616;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { baseUrl } from "../../config/env"; // 引入公共配置
import { mapActions, mapState } from "vuex";

function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === 'start') {
    year = year - 40;
  } else if (type === 'end') {
    year = year + 0;
  }
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}

export default {
  data() {
    return {
      img: "/static/default.jpg", // 用来在前端展示的图片，如上面图片中显示的一样
      src1: "", // 提交到后台的图片信息

      username: '',

      brief: '',

      birth_day: getDate({
        format: true
      }),
      birth_day_default:'0000-00-00',
      startDate: getDate('start'),
      endDate: getDate('end'),

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
      if(this.user.img != null) {
		  this.img = baseUrl + this.user.img;
	  }
      this.username = this.user.nickname;
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
    // 改变昵称
    changeUserName(e) {
      if(e.detail.value){
        this.updateUserData("nickname", e.detail.value);
      }
    },
	  // 改变性别
    changeSex(e) {
      this.updateUserData("sex", e.detail.value);
    },
    // 改变出生日期
    bindDateChange(e) {
      this.updateUserData("birth_day", e.detail.value);
    },
	  // 改变个性签名
    changeBrief(e) {
      if(e.detail.value){
        this.updateUserData("brief", e.detail.value);
      }
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
  },
};
</script>

<style lang="scss" scoped>
.uni-picker-container {
  position: fixed;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 0;
  box-sizing: border-box;
  z-index: 999;
  font-size: 16px;
}
// 原子性
.flex {
  display: flex;
  align-items: center;
}
.t_r {
  text-align: right;
}
.m-r-24 {
  margin-right: 24rpx;
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
  border: 0.01px solid #E9E9E9;
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
