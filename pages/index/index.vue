<template>
	<view class="content">
		<!-- 上 -->
		<view class="top-box" @click="toCreateProject">
			<view class="icon">&#xe612;</view>
			<view>点击书写你的日程计划吧~</view>
			<!-- <image class="image" src="/static/click.jpg"></image> -->
		</view>
		<!-- 中间部分 -->
		<!-- 11 -->
		<!-- {{ projectList }} -->
		<view class="level-box">
			<view class="grade">
				<!-- 第一级别 -->
				<view
					class="level-one"
					v-for="(t,i) in projectList"
					:key="i"
				>
					<!-- 图标 -->
					<!-- <view class="image">
						<view :class="t.project_icon"></view>
					</view> -->
					<!-- 项目名字 -->
					<view class="text">{{t.project_name}}</view>
					<!-- 项目计划情况 -->
					<view class="fraction">
						<view class="buttom">
							<view class="price">{{t.project_plan}}</view>
							<text class="iconfont" @click="deleteProject(i)">&#xe617;</text>
							<!-- <i class="iconfont icon-shanchu"></i> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 projectList: [],
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				uni.request({
					url:'/getProjectList',
					method:'POST',
					data: {
						user_id:'1465'
					}
				}).then(res=>{
					console.log("res",res)
					console.log("res.data",res[1].data)
					// console.log("res.data.data",res.data.data)
					this.projectList = res[1].data.data
				}).catch(err=>{
					console.log("err",err)
				})
				// let data = {
				// 	user_id: this.$store.getters["user/id"],
				// };
				// this.$http.post("/getProjectList", data).then((res) => {
				// 	console.log(res.data.data);
				// 	if (res.data.code === "1") {
				// 		// this.projectList = res.data.data.reverse();
				// 		this.projectList = res.data.data;
				// 	} else {
				// 	}
				// });
			},
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
	margin-top: 44px;
	padding: 24rpx 36rpx 24rpx 36rpx;
	font-weight: 600;
	background: #FFFFFF;
}
.icon {
	font-size: 44rpx;
	margin-right: 20rpx;
}

.level-box {
	margin-top: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	.grade {
		width: 94%;
		text-align: center;
		border-radius: 30rpx;
		.level-one {
			display: flex;
			// height: auto;
			height: 44px;
			// background: white;
			border: 1rpx solid gray;
			box-shadow: 0px 0px 0.2rem #f7e8d5;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
			overflow: hidden;
			.image {
				// margin-left: 0.7rem;
				color: orange;
			}
			.text {
				font-size: 32rpx;
				width: 10rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 0.4rem;
				font-weight: bold;
			}
			.fraction {
				// margin-right: 1rem;
				// border-radius: 0.5rem;
				// padding: 0.4rem 1rem;
				.buttom {
					display: flex;
					align-items: center;
					text-align: center;
					justify-content: space-between;
					width: 10rem;
					.iconfont {
						margin-right: 24rpx;
						margin-left: 40rpx;
						font-size: 36rpx;
					}
				}
			}
		}
	}
}
	
</style>
