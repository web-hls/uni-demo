<template>
	<view class="content">
		<!-- 上 -->
		<view class="top-box" @click="toCreateProject">
			<view class="icon">&#xe612;</view>
			<view>点击书写你的日程计划吧~</view>
			<!-- <image class="image" src="/static/click.jpg"></image> -->
		</view>
		<!-- 中间部分 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			toCreateProject(){
				console.log("000")
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7e8d5;
}
.top-box {
	display: flex;
	align-items: flex-end;
	padding: 44px 36rpx 24rpx 36rpx;
	font-weight: 600;
	background: #FFFFFF;
}
.icon {
	font-size: 44rpx;
	margin-right: 20rpx;
}
	
</style>
