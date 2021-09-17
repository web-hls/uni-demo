<template>
  <view>
		<view @click="goToPublishDynamic">
			动态页面
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
					:src="a.img"
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
			this.username = this.user.nackname,
			this.imageUrl = this.user.img,
			this.getList()
		},

		methods: {
			getList(){
				uni.request({
					url:"/getDynamicList",
					method: "POST",
					data: {
						user_id: this.user.id
					}
				}).then(res=>{
					console.log(res)
					console.log(res[0])
					console.log(res[0].data)
					console.log(res[0].data.data)
					if(res[1].data.code ==1){
						this.dynamicList = res[0].data.data
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
.dynamic-content {
  display: flex;
  align-items: center;
  justify-content: left;
  background: white;
  .image {
    margin: 0.5rem 0.8rem;
    > img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 2.25rem;
      margin: 0.2rem;
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
</style>
