<template>
	<view class="login-content">
		<image class="cube-logo" src="https://labfile.oss.aliyuncs.com/courses/4715/1627885535(1).png"></image>
		<view class="login-input">
			<input class="uni-input input" focus placeholder="请输入账号" v-model="form.account" placeholder-style="color:#cccccc"/>
			<input class="uni-input input" focus placeholder="请输入密码" v-model="form.password" password placeholder-style="color:#cccccc"/>
		</view>
		<view class="login-button">
			<button class="button" type="default" @click="login">登录</button>
		</view>
		
		<view class="relevant-description">
			<view class="description-one">还未注册，<text class="color-mark" @click="goToRegister">点击注册</text></view>
			<view class="description-two">点击注册即代表您同意<text class="color-mark">《用户协议》</text>和<text class="color-mark">《隐私协议》</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					account: "",
					password: ""
				},
			}
		},
		methods: {
			login(){
				// 账号不能为空
				if(!this.form.account){
					return uni.showToast({
						title: '账号不能为空',
						icon: 'none',
						duration: 2000
					});
				}
				// 密码不能为空
				if(!this.form.password){
					return uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 2000
					});
				}
				uni.request({
				    url: '/login', 
					method:'POST',
					data: {
						account:this.form.account,
						password:this.form.password
					},
				    success: (res) => {
				        console.log(res);
						console.log(res.data.code)
						if(res.data.code == 1){
							uni.navigateTo({
							    url: '/pages/index/index'
							});
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								duration: 5000
							});
						} else {
							uni.showToast({
								title: '登录失败',
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
			goToRegister(){
				uni.navigateTo({
				    url: '/pages/register/register'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-content {
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
		.login-input {
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
		.login-button {
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
