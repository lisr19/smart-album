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
			<div class="img-box">
				<div class="img-item" v-for="(item,index) in imgList"  @click="choiceImg(item,index)" >
					<img :src="item.picUrl" alt="" >
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
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
				.img-item{
					position: relative;
					img{
						width:180px;
						height:180px;
						display: inline-block;
						margin:2px 3px;
					}
				}

			}
		}

	}
</style>
