<template>
	<div class="wrap">
		<img  src="@/assets/img/loading.png" >
		<p class="tip">{{title}}</p>
		<p class="line"></p>
	</div>
</template>

<script>
	export default {
		props: {
			title:{
				type:String,
				default:"处理中..."
			}
		},
		data() {
			return {
				isBack:false
			}
		},
		methods:{
			goBack(){
				this.$router.back()//返回上一层
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: #000000;
		opacity: 0.8;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.tip{
			font-size:32px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:44px;
			text-shadow:0px 4px 8px rgba(103,222,255,1);
			margin-top: -130px;
		}
		img{
			width: 90%;
			display: block;
		}
		@keyframes dong {
			0% {
				transform: translate(0px, 0px);
			}
			50% {
				transform: translate(0px, -420px);
			}
			100% {
				transform: translate(0px, 0px);
			}
		}
		.line{
			width:506px;
			height:5px;
			bottom: 35%;
			background-color: #00E0D8;
			position: absolute;
			animation: dong 15s infinite;
			box-shadow:0px 10px 10px 0px rgba(145,185,255,1);
		}
	}
</style>
