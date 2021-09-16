<template>
	<view @click="goToPublishDynamic">
		动态页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToPublishDynamic(){
				uni.navigateTo({
					url: "/pages/dynamic/publishDynamic",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
