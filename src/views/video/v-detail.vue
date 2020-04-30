<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
			<img src="@/assets/img/menu.png" >
		</div>
		<div class="main">
			<video class="big-img" :src="videoUrl" controls></video>
		</div>
		<div class="foot">
			<div class="btn">
<!--				<a href="" download="http://sdcmi.halohealth.cn/videos/1555578747765.mp4">保存视频</a>-->
				<a :href="videoUrl" download="生成视频">保存视频</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				showTip:false,
				currIndex:0,
				videoUrl:''
			}
		},
		created(){
			this.videoUrl= this.$route.query.videoUrl
			console.log(this.videoUrl);
		},
		mounted(){
		},
		methods:{
			openDetail(item){
				if(item==='智能选图') {
					this.$router.push({name:'智能选图'})
				}else if(item==='视频') {
					this.$router.push({name:'视频'})
				}
			},
			openTwo(){
				this.$router.push({name:'人脸'})
			},
			selctImg(item,index){
				this.cuurImg = item.picUrl
				this.currIndex =index
			},
			shoewAll(){
				this.isAllImg=!this.isAllImg
			}
		}
	}
</script>

<style lang="less" scoped>
	.page{
		height: 100%;
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
			i{
				color: #333333;
			}
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.main{
			.big-img{
				/*width:674px;*/
				max-width:674px;
				/*height:682px;*/
				display: block;
				margin: 30px auto 20px;
				text-align: center;
				background-color:rgba(0,0,0,0.8);
				border-radius: 8px;
			}
			.wrap-box{
				overflow: hidden;
				border-top: #B3B3B3 solid 0.5px;
				.items{
					height: 248px;
					padding:44px 20px 44px;
					.item{
						font-size:28px;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(51,51,51,1);
						width:160px;
						img{
							width:158px;
							height:160px;
							margin: 10px 0;
							display: block;
							border-radius: 8px;
						}
						.active{
							position: absolute;
							bottom: 90px;
						}
					}
				}
			}

		}
		.foot{
			height:202px;
			background:rgba(250,250,250,0.9);
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.btn{
				width:364px;
				height:116px;
				line-height: 116px;
				background:rgba(255,255,255,1);
				box-shadow:0px 4px 8px 0px rgba(210,227,255,1);
				border-radius:20px;
				margin: 0 auto;
				font-size:40px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(44,44,44,1);
				a{
					display: block;
					width: 100%;
					height: 100%;
					color:rgba(44,44,44,1);
					text-decoration:none;
				}
			}
		}
	}
</style>
