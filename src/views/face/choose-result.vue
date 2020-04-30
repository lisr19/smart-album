<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			<div class="icon">
<!--				<span @click="comfn" style="margin-left:40px;color:#2D7AFF">保存</span>-->
				<span @click="goIndex" style="margin-left:40px;color:#2D7AFF">确定</span>
			</div>
		</div>
		<div class="main">
			<p class="tip">系统已根据评分为您选择最优质的图片</p>
			<template v-if="imgList.length===1">
				<div style="display: flex;align-items: center;justify-content: center">
					<img class="big-img" :src="imgList[0].picUrl" alt="" @click="openItem(item,index)" >
				</div>
			</template>
			<template v-else-if="imgList.length===2">
				<div class="img-box2">
					<div class="img-item" v-for="(item,index) in imgList"  @click="openItem(item,index)" >
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</template>
			<template v-else-if="imgList.length>4">
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in imgList"  @click="openItem(item,index)" >
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</template>
			<template v-else>
				<div class="img-box3">
					<div class="img-item" v-for="(item,index) in imgList"  @click="openItem(item,index)" >
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</template>
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
				showImg:false,
				cuurImg:null,
				isAll: false,
				imgList:[],
			}
		},
		created(){
			this.best_img=this.$route.params.best_img
			console.log(this.best_img);
			for(let i in this.best_img){
				this.imgList.push({picUrl:this.best_img[i]})
			}
			console.log(this.imgList);
		},
		mounted(){
		},
		methods:{
			openItem(item,index){
				this.cuurImg = item.picUrl
				this.showImg  =true
			},
			goIndex(){
				this.$router.push({name:'首页'})
			},
			openScore(){
				this.$router.push({name:'评分'})
			},
			comfn(){
				// this.$router.push({name:'保存',query:{resultImg:this.resultImg}})
				this.$router.push({name:'保存成功'})
			},
			choiceAll(){
				this.imgList.forEach((item)=>{
					this.$set(item, 'checked', true)
					this.isAll =true
				})
				this.selItemList = this.imgList
			},
			choiceImg(item,index){
				this.selItemList=[]
				if (typeof item.checked == 'undefined') {
					this.$set(item, 'checked', true)
				} else {
					item.checked = !item.checked
				}
				for (let i = 0; i < this.imgList.length; i++) {
					if (this.imgList[i].checked) {
						this.selItemList.push(this.imgList[i])
					}
				}
			},
		}
	}
</script>
<style>

</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		.head-bar{
			background-color: #ffffff;
			z-index: 99;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			line-height: 120px;
			height: 120px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			padding: 0 38px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
			.icon{
				display: flex;
				align-items: center;
				span{
					font-size:32px;
				}
			}
		}
		.main{
			padding-top: 120px;
			.tip{
				font-size:26px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(114,114,114,1);
				height:80px;
				line-height: 80px;
				background:rgba(242,242,242,1);
			}
			.img-box{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				padding-top: 20px;
				.img-item{
					position: relative;
					img{
						width:220px;
						height:220px;
						display: inline-block;
						margin:8px;
					}
				}
			}
			.img-box2{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				margin-top: 20px;
				.img-item{
					position: relative;
					img{
						width:550px;
						height:550px;
						display: inline-block;
						margin:5px;
					}
				}
			}
			.img-box3{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				margin-top: 180px;
				.img-item{
					position: relative;
					img{
						width:330px;
						height:330px;
						display: inline-block;
						margin:10px;
					}
				}
			}
			.big-img{
				max-width:674px;
				height:682px;
				background: #d3adf7;
				display: block;
				text-align: center;
				border-radius: 10px;
				overflow: hidden;
				margin-top: 180px;
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
	}
</style>
