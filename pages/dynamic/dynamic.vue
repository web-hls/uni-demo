<template>
  <view class="publish-dynamic">
		<view class="go-to-publish-dynamic" @click="goToPublishDynamic">
			+
		</view>
		<view
			v-for="(a,i) in dynamicList"
			:key="i"
		>
			<view class="dynamic-content">
				<view class="image">
					<image
						v-if="imageUrl"
						:src="imageUrl"
					>
				</view>
				<view class="text-right">
					<view class="name">{{username}}</view>
					<view class="public-time">{{a.create_time}}</view>
				</view>
			</view>
			<view class="middle">
				<view class="brief">{{a.content}}</view>
				<img
				  v-for="(item,i) in a.img"
					:src="item"
					alt=""
				>
			</view>
    </view>
		<view style="margin-bottom:3rem"></view>
	</view>
</template>

<script>
  import { mapState } from "vuex";
	export default {
		data() {
			return {
				id:'',
				username: '', // 昵称
				imageUrl:'',  // 头像
				dynamicList: [],
				dianzan: 0,
				zhuangfa: 0,
				like: true,
				create_time: '',
				content:''
			}
		},
		computed: mapState(["user"]), // 拿值

		onLoad(){
			this.id = this.user.id,
			this.imageUrl = this.user.img,
			this.username = this.user.nackname,
			this.getList()
		},

		methods: {
			getList(){
				uni.request({
					url:"/getDynamicList",
					method: "POST",
					data: {
						user_id: this.id
					}
				}).then(res=>{
					console.log(res)
					if(res[1].data.code ==1){
						this.dynamicList = res[1].data.data
					}
				})
			},
			goToPublishDynamic(){
				uni.navigateTo({
					url: "/pages/dynamic/publishDynamic",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.publish-dynamic {

	.go-to-publish-dynamic {
		position: fixed;
		right: 0;
		background: antiquewhite;
		margin: 5rpx 30rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		font-size: 66rpx;
	}

	.dynamic-content {
		display: flex;
		align-items: center;
		justify-content: left;
		background: white;
		.image {
			margin: 20rpx;
			> image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 20rpx;
				margin: 15rpx;
			}
		}
		.text-right {
			// margin-left: 0.4rem;
			.name {
				font-size: 1rem;
				font-weight: bold;
			}
		}
	}
	.middle {
		background: white;
		text-align: center;
		.brief {
			margin-left: 2.2rem;
			font-size: 1.1rem;
			font-weight: 450;
			width: 85%;
			margin-bottom: 0.4rem;
			text-align: justify;
		}
		> img {
			width: 80%;
			height: 20rem;
			text-align: center;
			border-radius: 0.8rem;
		}
	}
}
</style>
