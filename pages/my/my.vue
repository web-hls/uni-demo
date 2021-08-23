<template>
	<view class="content">

		
    <view class="basic-info">
		<view class="basic-info-left">
			<view class="image">
				<image class="user__avatar" src="../../static/cat.jpg"></image>
			</view>
			<view class="nackname">
				<text class="name">阿珊和她的猫</text>
				<view class="brief">前端工程师，蓝桥签约作者</view>
			</view>
		</view>
		<view class="basic-info-right">
			<text class="icon">&#xe612;</text>
		</view>
		
    </view>

	<!-- <button type="primary" @click="goto('/pages/index/index')">通过方法跳转到首页</button> -->


	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			 goto(url) {
				uni.switchTab({
					url:url
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		  // height: 100% - calc(44px + env(safe-area-inset-top));
		  height: 100%;
		  background: #f7e8d5;
		  position: fixed;
		  overflow-y: scroll;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		.basic-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.basic-info-left {
			display: flex;
			align-items: center;
			width: 90%;
		}
		.image {
			padding: 50px 20px;
			width: $uni-img-size-lg;
			height: $uni-img-size-lg;
		}
		.user__avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.nackname {
			margin: 40rpx 0rpx 10rpx 20rpx;
		}
		.name {
			font-size: 35rpx;
		}
		.brief {
			font-size: 30rpx;
			width: 500rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;

		}
		.basic-info-right {
			width: 10%;
		}
		.icon {
			font-size: 48rpx;
			margin-right: 40rpx;
			padding-right: 20rpx;
		}
	}

</style>
