<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
			<img src="@/assets/img/menu.png" alt="" >
		</div>
		<div class="main">
			<img class="big-img" :src="cuurImg" controls  @click="showImg  =true"></img>
		</div>
		<div class="foot">
			<div class="btn" @click="openSucc">
				<a :href="cuurImg"  download="图片">保存照片</a>
			</div>
		</div>
		<van-overlay :show="showImg" @click="showImg = false" >
			<div class="show-img-box">
				<img :src="cuurImg" alt="">
			</div>
		</van-overlay>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				cuurImg:null,
				cuurName:null,
				showImg:false,
				showTip:false,
				currIndex:0,
			}
		},
		created(){
			this.cuurImg = this.$route.query.cuurImg
			this.cuurName = this.$route.query.cuurName
			console.log(this.cuurImg);
		},
		mounted(){
		},
		methods:{
			openSucc(){
				// this.$router.push({name:'保存成功',query:{cuurImg:this.cuurImg}})
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
<style>
	.van-overlay{
		z-index: 99!important;
	}
</style>

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
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.main{
			.big-img{
				max-width:674px;
				max-height:682px;
				background: #d3adf7;
				display: block;
				margin: 80px auto 0;
				text-align: center;
				border-radius: 10px;
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
			margin-top: 220px;
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
	.show-img-box{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		img{
			width: 100%;
			height: auto;
		}
	}
</style>
