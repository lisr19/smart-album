<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			<div class="icon">
				<span @click="choiceAll">全选</span>
				<span @click="comfn" style="margin-left:40px;color:#2D7AFF">确定</span>
			</div>
		</div>
		<div class="main">
			<div class="img-box">
				<div class="img-item" v-for="(item,index) in imgList"  @click="choiceImg(item,index)" >
					<img :src="item.picUrl" alt="" >
					<span :class="{checked:item.checked}" class="dot">
						<van-icon color="#2D7AFF" v-if="item.checked"  name="checked" size="18px"/>
					</span>
				</div>
			</div>
		</div>
		<van-tabbar v-model="active">
			<van-tabbar-item>
				<span style="color: #2D7AFF">相似图像择优</span>
				<img slot="icon" src="@/assets/img/icon8.png">
			</van-tabbar-item>
			<van-tabbar-item icon="search" @click="openScore">
				<span style="color: #2D7AFF">图像评分</span>
				<img slot="icon" src="@/assets/img/icon9.png">
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				cuurImg:null,
				isAll: false,
				active:0,
				imgList:[
					{
						picUrl:require('@/assets/img/1.jpg'),
					},
					{
						picUrl:require('@/assets/img/2.jpg'),
					},
					{
						picUrl:'http://nursing-care.halohealth.cn/images/1576468148075.jpg',
					},
					{
						picUrl:require('@/assets/img/1.jpg'),
					},
					{
						picUrl:'http://nursing-care.halohealth.cn/images/1576468148075.jpg',
					},
					{
						picUrl:require('@/assets/img/2.jpg'),
					},
					{
						picUrl:require('@/assets/img/1.jpg'),
					},
				],
			}
		},
		created(){
		},
		mounted(){
		},
		methods:{
			openScore(){
				this.$router.push({name:'评分'})
			},
			comfn(){
				if(!this.selItemList.length){
					this.$toast('请选择图片')
					return
				}
				// this.$router.push({name:'保存',query:{resultImg:this.resultImg}})
				this.$router.push({name:'保存'})
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
		.img-box{
			display: flex;
			flex-wrap: wrap;
			.img-item{
				position: relative;
				img{
					width:180px;
					height:180px;
					display: inline-block;
					margin: 3px;
				}
				.dot{
					position: absolute;
					width:30px;
					height:30px;
					background:rgba(255,255,255,1);
					top:10px;
					right: 10px;
					border-radius: 50%;
					i{
						position: absolute;
						width:30px;
						height:30px;
						top:-1px;
						right:1px;
					}
				}
				.checked{
				}
			}

		}
	}
</style>
