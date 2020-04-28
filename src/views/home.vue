<template>
	<div class="home">
		<div class="head-bar">
			<van-icon  name="wap-nav" color="#333333" size="40px" @click.stop="showTip=!showTip"/>
			<div class="tip-box" v-if="showTip">
				<p >教程</p>
				<p >设置</p>
				<p >帮助&反馈</p>
			</div>
		</div>
		<div class="main">
			<div @click="opneIndex">
				<van-icon name="add-o" size="5rem"/>
				<p>打开你的图片</p>
			</div>

		</div>
	</div>
</template>

<script>
	import {Toast } from 'vant';
	export default {
		name: 'home',
		components:{
			Toast
		},
		data() {
			return {
				ipAddr:'',
				showTip:false,
				showInput:false,
				imgUrl:''
			}
		},
		created() {
		},
		methods: {

			opneIndex(){
				this.$router.push({name:'相册首页'})
			},
		}
	}
</script>

<style lang="less" scoped>
	.home{
		min-height: 100%;
		.head-bar{
			line-height: 150px;
			height: 150px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			padding: 0 48px;
			text-align: right;
			img{
				width:80px;
				height:80px;
				background:rgba(0,0,0,1);
				border-radius: 50%;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.tip-box{
			width:236px;
			background:rgba(81,81,81,1);
			position: absolute;
			right: 32px;
			top: 120px;
			border-radius: 20px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			padding:0 20px;
			box-sizing: border-box;
			p{
				text-align: left;
				font-size:32px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:88px;
			}
			p:first-child{
				border-bottom:solid 2px #626262 ;
			}
		}
		.main{
			margin-top: 200px;
			font-size:36px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(158,158,158,1);
			p{
				margin-top: 30px;
			}
		}
	}
</style>