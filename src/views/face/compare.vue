<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
		</div>
		<div  class="main">
			<div class="img-box">
				<div class="img-item" v-for="(item,index) in imgList"  @click="choiceImg(item,index)" >
					<img :src="item.picUrl" alt="" >
					<span v-if="isEdit" :class="{checked:item.checked}" class="dot">
						<van-icon color="#2D7AFF" v-if="item.checked"  name="checked" />
					</span>
				</div>
			</div>
		</div>
		<div class="foot">
			<div class="wrap-box">
				<swiper class="items" :options="swiperOption" ref="mySwiper">
					<!-- slides -->
					<swiper-slide class="item" v-for="(item,index) in selItemList" :key="index">
						<img  :src="item.picUrl" alt=""  @click.stop="">
					</swiper-slide>
				</swiper>
			</div>
			<div class="btn" @click="saveBtn" :class="{active:isSure}">确认</div>
		</div>
		<van-popup v-model="showImg">
			<div class="show-wrap">
				<img class="big-img" :src="currImg" alt="">
			</div>
		</van-popup>
		<loading v-if="isLoading"></loading>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'
	import loading from '@/components/loading/loading'
	export default {
		components:{
			loading
		},
		computed:{
			...mapState({
				imgList:state=>state.user.imgList,
			}),
		},
		data(){
			return{
				human_list:{},
				isLoading:false,
				isSure:false,
				currImg:false,
				showImg:false,
				isEdit:true,
				isAll: false,
				icon: {
					active: 'https://img.yzcdn.cn/vant/user-active.png',
					inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
				},
				selItemList:[],
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					loop:false
				},
			}
		},
		watch:{
			selItemList(newL,oldL){
				if(newL.length>1){
					this.isSure=true
				}else {
					this.isSure=false
				}
			},
		},
		created(){
			// console.log(this.imgList);
			this.reset()
		},
		mounted(){
		},
		methods:{
			saveBtn(){
				if(!this.isSure){
					this.$toast('请选择图片对比')
				}else{
					if(	this.selItemList.length<2){
						this.$toast('请选择图片对比')
					}else if(this.selItemList.length>2){
						this.$toast('最多选择两张图片对比')
					}else {
						// this.$router.push({name:"对比结果",query:{selItemList:this.selItemList}})
						console.log(this.selItemList);
						this.compareFace()
					}
				}
			},
			//人脸对比
			compareFace(){
				this.human_list = {}
				this.selItemList.forEach((i)=>{
					let name =i.name
					// this.human_list[name] =  '/smart_albums/static/photos/xMiIsQy01MuycJB/'+i.picUrl.split("xMiIsQy01MuycJB/")[1]
					this.human_list[name] =  '/smart_albums/static/photos/'+i.picUrl.split("photos/")[1]
				})
				let params ={
					access_token:localStorage.getItem('access_token'),
					face_imgs:this.human_list
				}
				this.isLoading = true
				axios.post('http://wanfanji.3322.org:13478/people_album/recognize',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:"对比结果",query:{selItemList:this.selItemList,compareData:data}})
							},500)
						}else if(res.data.status.code===-1){
							this.isLoading = false
							this.$toast(res.data.data.msg)
						} else{
							this.isLoading = false
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			reset(){
				this.selItemList=[]
				this.imgList.forEach((item)=>{
					this.$set(item, 'checked', false)
				})
			},
			cancel(){
				this.selItemList=[]
				this.imgList.forEach((item)=>{
					this.$set(item, 'checked', false)
					this.isAll =false
				})
				this.isEdit =false
			},
			choiceAll(){
				this.imgList.forEach((item)=>{
					this.$set(item, 'checked', true)
					this.isAll =true
				})
				this.selItemList = this.imgList
			},
			choiceImg(item,index){
				if(this.isEdit){
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
				}else {
					this.currImg = item.picUrl
					this.showImg = true
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
			z-index: 99;
			background-color: #ffffff;
			line-height: 120px;
			height: 120px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			padding: 0 38px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			width: 100%;
			box-sizing: border-box;
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
			.img-box{
				display: flex;
				flex-wrap: wrap;
				.img-item{
					position: relative;
					width:180px;
					height:180px;
					margin: 5px 3px;
					img{
						width:180px;
						height:180px;
						display:block;
					}
					.score{
						height:42px;
						width:184px;
						background:linear-gradient(180deg,rgba(166,199,255,1) 0%,rgba(45,122,255,1) 100%);
						border-radius:8px 8px 0px 0px;
						opacity:0.5;
						text-align: center;
						color:rgba(255,255,255,1);
						position: absolute;
						bottom: 0;
						z-index: 9;
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
							top:-3px;
							right:1px;
							font-size: 36px;
						}
					}
					.checked{
						background:none;
					}
				}
			}
		}

		.foot{
			height:198px;
			background:rgba(250,250,250,1);
			bottom: 0;
			z-index: 99;
			position: fixed;
			display: flex;
			align-items: center;
			width: 100%;
			border-top: solid #f4f3e4 0.5px;
		}
		.wrap-box{
			height:198px;
			padding: 0 40px;
			flex: 2;
			overflow: auto;
			position: relative;
			.items{
				margin-top: 20px;
				.item{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					width:160px;
					img{
						width:144px;
						height:144px;
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
		.btn{
			width:144px;
			height:80px;
			line-height: 80px;
			background:rgba(153,153,153,1);
			border-radius:30px;
			text-align: center;
			font-size:32px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			margin: 0 40px;
		}
		.active{
			background:rgba(45,122,255,1);
		}
		.show-wrap{
			.big-img{
				max-height:896px;
				display: block;
			}
		}

	}
</style>
