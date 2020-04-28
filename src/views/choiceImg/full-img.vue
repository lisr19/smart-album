<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			评分：{{score}}
		</div>
		<div  class="main">
			<img :src="cuurImg" alt="">
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				cuurImg:null,
			}
		},
		created(){
			this.cuurImg = this.$route.query.cuurImg
			this.score = this.$route.query.score
		},
		mounted(){
		},
		methods:{
		}
	}
</script>
<style>

</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		position: absolute;
		width: 100%;
		background:rgba(245,246,247,1);
		.head-bar{
			line-height: 120px;
			height: 120px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			padding: 0 38px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(45,122,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;
			img{
				height:60px;
				z-index: 2;
				position: absolute;
				left: 38px;
			}
		}
		.main{
			display: flex;
			align-items: center;
			height: 90%;
			img{
				width: 100%;
				display: block;
			}
		}
	}
</style>
