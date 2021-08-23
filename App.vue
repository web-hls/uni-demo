<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: 'iconfont';  /* Project id 2762531 */
	  src: url('https://at.alicdn.com/t/font_2762531_81nd6xfyago.woff2?t=1629698679140') format('woff2'),
	       url('https://at.alicdn.com/t/font_2762531_81nd6xfyago.woff?t=1629698679140') format('woff'),
	       url('https://at.alicdn.com/t/font_2762531_81nd6xfyago.ttf?t=1629698679140') format('truetype');
	}
	.icon {
		font-size: 38rpx;
		color:#000;
		font-family: iconfont;
	}
</style>
