<template>
	<view class="content">
		  <!-- 修改头像 -->
      <view class="edit-image">
        <view class="text">头像</view>
        <view class="image">
					<view class="userAvatar" @tap="addImage"> 
						<image :src="src" style="height: 100%;width: 100%;"></image>
					</view>
          <!-- <el-upload
            class="avatar-uploader"
            action="http://localhost:7001/uploadUser"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
          </el-upload> -->
          <view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
        </view>
      </view>
			<view class="tansition-line"></view>
			<!-- 昵称 -->
      <view class="edit-left-box" @click="changeUserName">
        <view class="edit-left-box-text">昵称</view>
        <view class="right-value">{{username}}
          <view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
        </view>
      </view>
      <view class="tansition-line"></view>
			<!-- 性别 -->
      <view class="edit-left-box" @click="changeSex">
        <view class="edit-left-box-text">性别</view>
        <view class="right-value" v-if="sex==0">男
          <view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
        </view>
        <view class="right-value" v-else>女
          <view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
        </view>
      </view>
      <view class="tansition-line"></view>
		  <!-- 出生日期 -->
      <view class="edit-left-box" @click="changeBirth">
        <view class="edit-left-box-text">出生年月</view>
        <view class="right-value">{{birth_day}}
          <view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
        </view>
      </view>
      <view class="tansition-line"></view>
			<!-- 个性签名 -->
      <view class="edit-left-box" @click="changeBrief">
        <view class="edit-left-box-text">个性签名</view>
        <view class="right-value-">{{brief}}
					<view class="iconfont">
						<text class="iconfont">&#xe616;</text>
					</view>
				</view>
      </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '/static/default.jpg', // 用来在前端展示的图片，如上面图片中显示的一样
				src1: '', // 提交到后台的图片信息
				username: '阿珊~',
				sex: 1,
				birth_day: '2000-01-17',
				brief: '前端工程师，蓝桥签约作者',
			}
		},
		onLoad() {

		},
		methods: {
			addImage() {
				var that = this;
				// 从本地相册选择图片或使用相机拍照。
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					//album 从相册选图，camera 使用相机，默认二者都有。
					sourceType: ['album'],	
					success: function(res) {
						//获取图片信息。
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								that.src = (res.tempFilePaths[0]);
								console.log("that.src----",that.src); //打印出图片信息,在浏览器上打开就是你上传的图片
								//将本地资源上传到开发者服务器，客户端发起一个 POST 请求，其中 content-type 为 multipart/form-data
								uni.uploadFile({
									//开发者服务器 url
									// url: _this.global.baseUrl + 'common/upload',
									url: "https://7de40d3b64c3-service.simplelab.cn:8080/updateUser",
									
									// url: "http://0.0.0.0:8080/updateUser" + '/public/uploads',
									//获取要上传文件资源的路径。
									filePath: res.tempFilePaths[0],
									//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
									name: 'file',
									//HTTP 请求 Header, header 中不能设置 Referer。
									header: {
										token: uni.getStorageSync('token')
									},
									
									//成功的回调
									success: uploadFileRes => {
										console.log("--------------")
										// 调用后台接口
										uni.request({
											url:'/updateUser',
											method: "post", // 设置请求方式
											data: {
												// id: this.$store.getters["user/id"],
												img: url,
											}, // 把注册参数放进请求中
										}).then(res=>{
											console.log("res",res)
										})
										//获取图片信息 网站域名 + res1.data.url就是一个图片的完整路径了
										var res1 = JSON.parse(uploadFileRes.data);
										that.src1 = res1.data.url;
										console.log(that.src1)
									}
								})
							}
						})	
					}
				})
			},

			changeUserName(){

			},
			changeSex(){

			},
			changeBirth(){

			},
			changeBrief(){

			}
		}
	}
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
				>image {
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
