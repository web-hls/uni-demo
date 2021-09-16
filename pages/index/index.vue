<template>
	<view class="content">
		<view class="top-box" @click="toAddProject">
			<view class="icon">&#xe612;</view>
			<view>点击书写你的日程计划吧~</view>
		</view>
		<view class="level-box">
			<view class="grade" v-if="projectList">
				<view
					class="level-one"
					v-for="(t,i) in projectList"
					:key="i"
				>
					<view class="text">{{t.project_name}}</view>
					<view class="fraction">
						<view class="buttom">
							<view class="price">{{t.project_plan}}</view>
							<text class="iconfont" @click="deleteProject(i)">&#xe617;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="m-b-100"></view>
	</view>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
				projectList: [],
		}
	},

	computed: mapState(["user"]), // 拿值

	onShow(){
		this.getList()
	},

	methods: {
		getList() {
			let user_id = this.user.id
			uni.request({
				url:'/getProjectList',
				method:'POST',
				data: {
					user_id
				}
			}).then(res=>{
				if(res[1].data.code === "1")
				this.projectList = res[1].data.data
			}).catch(err=>{
				console.log("err",err)
			})
		},
		deleteProject(index){
			var that = this
			uni.showModal({
				// title: '提示',//提示标题
				content: '是否删除该计划?',//提示内容
				cancelText: "取消", // 取消按钮的文字  
				confirmText: "删除", // 确认按钮文字  
				confirmColor:'#F54E40',//删除字体的颜色
				cancelColor:'#000',//取消字体的颜色
				success: function (res) {
					if(res.confirm){
						const id = that.projectList[index].id;
						uni.request({
							url:'/deleteProject/' + id,
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
				},
				fail: function (res) {
					console.log(res.errMsg);
				}
			})
		},
		toAddProject(){
			uni.navigateTo({
				url: "/pages/index/addProject",
			});
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
			height: 44px;
			background: white;
			border: 1rpx solid gray;
			box-shadow: 0px 0px 0.2rem #f7e8d5;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
			overflow: hidden;
			.image {
				color: orange;
			}
			.text {
				font-size: 32rpx;
				width: 10rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				// margin-left: 0.4rem;
				font-weight: bold;
			}
			.fraction {
				.buttom {
					display: flex;
					align-items: center;
					// text-align: center;
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
.m-b-100 {
	margin-bottom:100rpx;
}
</style>
