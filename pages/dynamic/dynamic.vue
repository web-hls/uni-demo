<template>
  <view class="publish-dynamic">
		<view class="go-to-publish-dynamic" @click="goToPublishDynamic">
			<text class="icon">&#xe623;</text>
		</view>
		<view class="every_item_dynamic" v-for="(a,index) in dynamicList"	:key="index">
			<view class="dynamic-basic-info">
				<!-- 头像 -->
				<view class="image">
					<image v-if="imageUrl" :src="imageUrl">
				</view>
				<!-- 昵称和创建时间 -->
				<view class="text-right">
					<view class="name">{{username}}</view>
					<view class="public-time">{{a.create_time}}</view>
				</view>
			</view>
			<!-- 发布的内容：文字/图片 -->
			<view class="text_and_pictrue">
				<view class="brief">{{a.content}}</view>
				<view id="imgs">
					<view class="imgSiae" v-for="(item,index) in a.img" :key="index">
						<img :src="`${baseImgPath}${item}`" alt="">
					</view>
				</view>
			</view>
			<!-- 点赞-评论-删除 -->
			<div class="bottom-share-comment-like">
				<div><text class="iconfont">&#xe61e;</text>点赞</div>
				<div><text class="iconfont">&#xe9b1;</text>评论</div>
				<div @click="deleteDynamic(index)"><text class="iconfont">&#xe617;</text>删除</div>
			</div>

    </view>
		<view style="margin-bottom:220rpx"></view>
	</view>
</template>

<script>
	import { baseUrl,baseImgPath } from "../../config/env"; // 引入公共配置
  import { mapState } from "vuex";
	export default {
		data() {
			return {
				id:'',
				baseImgPath,
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

		onShow(){
			this.id = this.user.id,
			this.imageUrl = this.user.img,
			this.username = this.user.nackname,
			this.getList()
		},

		methods: {
			// 获取动态列表
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
						this.dynamicList = res[1].data.data.reverse();
					}
				})
			},
			// 删除动态
			deleteDynamic(index){
				var that = this
				uni.showModal({
					content: '是否删除该动态?',//提示内容
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "删除", // 确认按钮文字  
					confirmColor:'#F54E40',//删除字体的颜色
					cancelColor:'#000',//取消字体的颜色
					success: function(res) {
						if(res.confirm) {
							const id = that.dynamicList[index].id;
							uni.request({
								url:'/deleteDynamic/' + id,
								methods: 'GET',
							}).then(res=>{
								console.log(res)
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 5000
								});
								that.getList()
							})
						}
					}
				})
			},
			// 去发动态
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
	height: 100%;
	background: #f7e8d5;
	position: fixed;
	overflow-y: scroll;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin-top: 44px;
  // 去发布动态
	.go-to-publish-dynamic {
		.icon {
			position: fixed;
			right: 0;
			background: #f7e8d5;
			margin: 30rpx;
			padding: 20rpx;
			border-radius: 50%;
			font-size: 66rpx;
			z-index: 999;
			color: black;
		}
	}
	// 每一项动态
	.every_item_dynamic {
		border: 1rpx solid #dad1d1;
		margin: 24rpx;
		border-radius: 10rpx;
	}
  // 动态基础信息，昵称和名字
	.dynamic-basic-info {
		display: flex;
		align-items: center;
		justify-content: left;
		background: white;
		.image {
			margin: 20rpx;
			> image {
			  width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
				margin: 15rpx;
			}
		}
		.text-right {
			.name {
				font-size: 1rem;
				font-weight: bold;
			}
		}
	}
	// 动态内容：文字和图片
	.text_and_pictrue{
    background: #ffffff;
	}
	#imgs {
		display: grid;//使用栅格更方便适配图片数量
		grid-template-columns: repeat(3, 1fr);
		margin: auto;
		background: white;
		text-align: center;
		display: flex;	
		padding-left: 8rpx;
		padding-bottom: 10rpx;
		flex-wrap:wrap;

	}
	.imgSiae {
		width: 30vw;
		height: 30vw;
		overflow: hidden;
		flex-wrap:wrap;
		padding: 3px; //这里使用padding，没有在父级使用grid-gap，因为编译器说过时了
		//下面是让padding去挤压内容，不撑大容器
		-moz-box-sizing: border-box; /*Firefox3.5+*/
		-webkit-box-sizing: border-box; /*Safari3.2+*/
		-o-box-sizing: border-box; /*Opera9.6*/
		-ms-box-sizing: border-box; /*IE8*/
		box-sizing: border-box;
		}
		// img {
		// 	display: flex;
		// 	flex-wrap:wrap;
		// 	width: 100%;
		// 	height: 100%;
		// 	object-fit: cover; //这里图片宽高都是100%，再加上object-fit属性目的是为了让不同宽高比的图片把外面的框都填满，类似放缩略图，点击查看全图得另外写
		// }
		.brief {
			text-indent:1em; // 首行缩进
      text-align: justify; // 两端对齐
			margin-left: 20rpx;
			font-size: 36rpx;
			font-weight: 500;
			text-align: justify;
			padding-bottom: 20rpx;
			margin-right: 20rpx;
			letter-spacing:2px; // letter-spacing 属性增加或减少字符间的空白（字符间距）。
		}
		> img {
			width: 80%;
			text-align: center;
			border-radius: 20rpx;
		}
		.bottom-share-comment-like {
			display: flex;
			align-items: center;
			justify-content: space-around;
			background: white;
			font-size: 1rem;
			padding: 0.5rem 0;
			.iconfont {
				margin-right: 0.2rem;
				font-size: 1.3rem;
			}
    }
}
</style>
