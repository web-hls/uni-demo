<template>
	<view class="register-content">
		<image class="cube-logo" src="https://labfile.oss.aliyuncs.com/courses/4715/1627885535(1).png"></image>
		<view class="register-input">
			<input class="uni-input input" focus placeholder="请输入账号" v-model="form.account" placeholder-style="color:#cccccc" />
			<input class="uni-input input" focus placeholder="请输入密码" v-model="form.password" password placeholder-style="color:#cccccc"/>
			<input class="uni-input input" focus placeholder="请确认密码" v-model="form.repass" password placeholder-style="color:#cccccc"/>
		</view>
		<view class="register-button">
			<button class="button" type="default" @click="register">注册</button>
		</view>
		
		<view class="relevant-description">
			<view class="description-one">已有账号，<text class="color-mark" @click="goToLogin">立即登录</text></view>
			<view class="description-two">点击注册即代表您同意<text class="color-mark">《用户协议》</text>和<text class="color-mark">《隐私协议》</text></view>
		</view>
		<!-- <web-view src="https://www.baidu.com">11111111111111S</web-view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
			  form: {
				account: "",
				password: "",
				repass: "",
			  },
			}
		},
		methods: {
			onLoad(){
				console.log("this.form",this.form)
			},
			// 点击注册调用方法
			register(){
				// 账号不能为空
				// if(!this.form.account){
				// 	return uni.showToast({
				// 		title: '账号不能为空',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// }
				
				// // 输入正确的手机号
				// var myPhoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				// if(!myPhoneReg.test(this.form.account)){
				// 	return uni.showToast({
				// 		title: '手机号码无效',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// }
				
				// // 密码不能为空
				// if(!this.form.password || !this.form.repass){
				// 	return uni.showToast({
				// 		title: '密码不能为空',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// }
				
				// // 密码不一致
				// if(this.form.password != this.form.repass){
				// 	return uni.showToast({
				// 		title: '密码不一致',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// }
				
				// 调用接口
				uni.request({
				    url: '/register', 
					method:'POST',
					data: {
						account:this.form.account,
						password:this.form.password
					},
				    success: (res) => {
				        console.log(res);
						if(res.data.code == 1){
							uni.navigateTo({
							    url: '/pages/login/login'
							});
							setTimeout(()=>{
								uni.showToast({
									title: '注册成功',
									icon: 'none',
									duration: 5000
								});
							})
						} else {
							uni.showToast({
								title: '注册失败',
								icon: 'none',
								duration: 2000
							});
						}
				    },
					fail: (err) => {
						console.log(err.data)
					}
				});
			},
			// 跳转到登录页面
			goToLogin(){
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-content {
	  background: #f7e8d5;
	  position: fixed;
	  overflow-y: scroll;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
		>image {
			margin-top: 100rpx;
			width: 100%;
		}
		.register-input {
			.input {
				border: 1rpx solid #cccccc;
				border-radius: 25rpx;
				background: $uni-bg-color;
				padding: 28rpx;
				width: 80%;
				text-align: left;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20rpx auto;
				height: 55rpx;
			}
		}
		.register-button {
			margin: 20rpx auto;
			width: 85%;
			background: #E6A23C;
			border-radius: 25rpx;
			.button {
				color: #FFFFFF;
				background: #E6A23C;
				margin-top: 40rpx;
				
			}
		}
		.relevant-description {
			text-align: center;
			.description-one {
				font-size: 36rpx;
				font-weight: 700;
				color:black;
				margin-top: 100rpx;
				margin-bottom: 20rpx;
			}
			.description-two {
				font-size: 28rpx;
				font-weight: 400;
				color: gray;
				margin-bottom: 100rpx;
			}
			.color-mark {
				color:#E6A23C
			}
		}
		
	}

</style>
