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
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  // account:'',
			  form: {
				account: "",
				password: "",
				repass: "",
			  },
			}
		},
		methods: {
			onLoad(){
				// console.log("this.account",this.account)
				console.log("this.form",this.form)
			},
			// 点击注册调用方法
			register(){
				uni.request({
					url: 'https://121.40.227.60/register',
					data: JSON.stringify(this.form),
					// data: this.form,
					method: 'POST',
					// header: {
					// 	'content-type':'application/json'
					// },
					success(res) {
						console.log("注册成功-",res)
					},
					fail(err) {
						console.log("注册失败-",err)
					}
				})
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
