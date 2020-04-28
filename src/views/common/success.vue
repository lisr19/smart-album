<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
			<img src="@/assets/img/menu.png" alt="">
		</div>
		<div class="main">
			<div class="tip">
				<img  src="@/assets/img/save.png" alt="">
				<p>保存成功</p>
			</div>
			<div class="btns">
				<div class="btn" @click="$router.back()">
					返回
				</div>
				<div class="btn"  @click="backIndex" style="background:rgba(51,51,51,1);color:rgba(255,255,255,1);">
					继续
				</div>
			</div>
			<div class="img-items">
				<img :src="item.picUrl" alt="" v-for="(item,index) in imgList">
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState} from "vuex";

	export default {
		computed:{
			...mapState({
				imgList:state=>state.user.imgList,
			}),
		},
		data(){
			return{
				showTip:false,
				currIndex:0,
			}
		},
		created(){
			this.cuurImg =this.$route.query.cuurImg
			this.imgList.unshift({name:'add',picUrl:this.cuurImg})

		},
		mounted(){
		},
		methods:{
			backIndex(){
				// this.$router.replace({name:'人脸'})
				this.$router.replace({name:"首页"})
			},
			openDetail(item){

			},
		}
	}
</script>
<style>

</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		padding-top: 150px;
		.head-bar{
			line-height: 150px;
			height: 150px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			padding: 0 48px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			top: 0;
			width: 100%;
			background: #ffffff;
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.main{
			.tip{
				width:670px;
				height:236px;
				background:rgba(250,250,250,1);
				border-radius:16px;
				text-align: center;
				margin: 0 auto;
				padding: 38px 0;
				box-sizing: border-box;
				img{
					width:72px;
					height:86px;
					margin:0px auto 20px;
					display: block;
				}
				p{
					font-size:40px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:56px;
				}
			}
			.btns{
				display: flex;
				align-items: center;
				margin-top: 30px;
				.btn{
					width:136px;
					height:68px;
					text-align: center;
					line-height: 68px;
					background:rgba(238,239,239,1);
					border-radius:10px;
					font-size:28px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.btn:first-child{
					margin: 0 52px;
				}
			}
			.img-items{
				margin-top: 84px;
				display: flex;
				flex-wrap: wrap;
				padding-left: 30px;
				img{
					width:324px;
					height:328px;
					display: inline-block;
					margin: 10px;
					background:rgba(216,216,216,1);
					border-radius:10px;
				}
			}
		}
	}
</style>
