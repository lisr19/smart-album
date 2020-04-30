<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			<div style="display: flex;align-items: center">
				<span class="h-btn" @click="comFn">保存</span>
			</div>
		</div>
		<div class="main">
			<div class="card">
				<p class="title">
					<input type="text" v-model="classOne">
				</p>
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in imgList"   @click="openItem(item,index)">
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</div>
			<div class="card">
				<p class="title">
					<input type="text" v-model="classTwo">
				</p>
				<div v-if="imgList2.length==0" style="margin-top: 20px">暂无</div>
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in imgList2"  @click="openItem(item,index)" >
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</div>
			<div class="card" v-if="imgList3.length>0">
				<p class="title">
					<input type="text" v-model="classThree">
				</p>
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in imgList3"  @click="openItem(item,index)" >
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
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
				classOne:'分组1',
				classTwo:'分组2',
				classThree:'分组3',
				cuurImg:null,
				isAll: false,
				showImg: false,
				imgList:[],
				imgList2:[],
				imgList3:[],
			}
		},
		created(){
			this.class_result = this.$route.params.class_result
			this.class_num = this.$route.params.class_num
			let array = Object.keys(this.class_result).map(key=> this.class_result[key])
			this.imgList = array[0]
			this.imgList2 = array[1]
			this.imgList3 = array[2]?array[2]:[]

		},
		mounted(){
			this.initImg()
		},
		methods:{
			openItem(item,index){
				this.cuurImg = item.picUrl
				this.cuurName = item.name
				this.currIndex =index
				this.showImg  =true
			},
			initImg(){
				let arr1 = []
				let arr2 = []
				let arr3 = []
				for(let i in this.imgList){
					arr1.push({picUrl:this.imgList[i]})
				}
				for(let i in this.imgList2){
					arr2.push({picUrl:this.imgList2[i]})
				}
				for(let i in this.imgList3){
					arr3.push({picUrl:this.imgList3[i]})
				}
				this.imgList=arr1
				this.imgList2=arr2
				this.imgList3=arr3
			},
			openDetail(){
				this.$router.push({name:'择优结果'})
			},
			comFn(){
				this.$toast('保存成功')
				// this.$router.push({name:'保存'})
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
<style lang="less">
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
<style lang="less" scoped>
	.page{
		height: 100%;
		.head-bar{
			z-index: 99;
			background-color: #ffffff;
			position: fixed;
			width: 100%;
			box-sizing: border-box;
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
		.main {
			padding: 120px 0;
			.card{
				.title{
					font-size:32px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					padding: 10px 38px;
					text-align: left;
					background-color:#eceef2;
					input{
						border: none;
						background-color:#eceef2;
					}
				}
			}
		}
		.img-box{
			display: flex;
			flex-wrap: wrap;
			margin: 30px 0;
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
