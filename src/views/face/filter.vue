<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			<div style="display: flex;align-items: center">
				<span class="h-btn" @click="comFn">确定</span>
			</div>
		</div>
		<div class="main">
			<div class="banner">
				<img class="big-img" :src="cuurImg" alt="">
			</div>
			<div style="display: flex;align-items: center;justify-content: flex-end;">
				<span class="tip" style="margin-right: 10px"><img src="@/assets/img/icon22.png" alt=""><em  @click="openClus">镜头特写</em></span>
				<span class="tip"><img src="@/assets/img/icon22.png" alt=""><em  @click="recoMmend">智能推荐</em></span>
			</div>

		</div>
		<div class="wrap-box">
			<swiper class="items" :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide class="item" v-for="(item,index) in colorList" :key="index">
					<div class="ctx" :class="{active:currIndex===index}" @click.stop="selctImg(item,index)">
						<span class="tip">{{item.filters_tmp}}</span>
<!--						<img  :src="cuurImg" alt=""  >-->
						<img  :src="item.color" alt=""  >
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<loading v-if="isLoading"></loading>
	</div>
</template>
<script>
	import {Toast } from 'vant';
	import loading from '@/components/loading/loading'
	export default {
		components:{
			Toast,
			loading
		},
		data(){
			return{
				filters_tmp:'Duke',
				isLoading:false,
				showTwo:false,
				isAllImg:true,
				cuurImg:null,
				cuurName:null,
				currIndex:0,
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
				},
				imgList:[
					{
						picUrl:require('@/assets/img/2.jpg'),
					},
					{
						picUrl:'http://nursing-care.halohealth.cn/images/1576468148075.jpg',
					},
				],
				colorList:[
					{
						filters_tmp:'Duke',
						color:require('@/assets/img/duke.png'),
					},
					{
						filters_tmp:'Ibiza',
						color:require('@/assets/img/Ibiza.png'),
					},
					{
						filters_tmp:'asana',
						color:require('@/assets/img/asana.png'),
					},

					{
						filters_tmp:'old',
						color:require('@/assets/img/old.png'),
					},

					{
						filters_tmp:'rooftop',
						color:require('@/assets/img/rooftop.png'),
					},
				],
				// colorList:[
				// 	{
				// 		filters_tmp:'Duke',
				// 		color:'#958b2e'
				// 	},
				// 	{
				// 		filters_tmp:'Ibiza',
				// 		color:'#ff0911'
				// 	},
				// 	{
				// 		filters_tmp:'asana',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'luge',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'old',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'waimea',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'Vegas',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'zipline',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'dark',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'vibe',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'aspen',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'freezing',
				// 		color:'#b1f7c0'
				// 	},{
				// 		filters_tmp:'swap',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'soleil',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'rooftop',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'grind',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'keel',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'grotto',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'graffiti',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'blue_bird',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'Nola',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'vai',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'na_pai',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'gil',
				// 		color:'#b1f7c0'
				// 	},
				// 	{
				// 		filters_tmp:'sequoia',
				// 		color:'#b1f7c0'
				// 	},
				// ],
			}
		},
		created(){
			this.cuurImg = this.$route.query.cuurImg
			console.log(this.cuurImg);
			console.log(this.cuurImg.split("photos/")[1]);
			this.cuurName = this.$route.query.cuurName
		},
		mounted(){
		},
		methods:{
			//特写
			openClus(){
				this.isLoading = true
				setTimeout(()=>{
					let params ={
						access_token:localStorage.getItem('access_token'),
						closeup_img:{
							[this.cuurName]: '/smart_albums/static/photos/'+this.cuurImg.split("photos/")[1],
							// [this.cuurName]: '/smart_albums/static/photos/xMiIsQy01MuycJB/'+this.cuurImg.split("xMiIsQy01MuycJB/")[1],
						}
					}
					axios.post('http://wanfanji.3322.org:13478/fancyTime/image_closeUp',params).then((res)=> {
						if (res.status == "200") {
							if(res.data.status.code===0){
								let data = res.data.data
								this.img_closeuped =data.img_closeuped
								setTimeout(()=>{
									this.isLoading = false
									this.$router.push({name:'保存',query:{cuurImg:this.img_closeuped,cuurName:this.cuurName}})
								},1500)
							}else{
								this.$toast(res.data.status.msg)
							}
						} else {
						}
					}).catch( (res) =>{
						setTimeout(()=>{
							this.isLoading = false
							this.$toast('接口失败')
						},5000)
						console.log(res);
					})
				},5000)
			},
			comFn(){
				this.isLoading = true
				let params ={
					access_token:localStorage.getItem('access_token'),
					filter_img:{
						[this.cuurName]: '/smart_albums/static/photos/'+this.cuurImg.split("photos/")[1],
					},
					filters_tmp:this.filters_tmp
				}
				console.log(params);
				axios.post('http://wanfanji.3322.org:13478/fancyTime/image_filter',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							this.img_filtered =data.img_filtered
							console.log(this.img_filtered);
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:'保存',query:{cuurImg:this.img_filtered,cuurName:this.cuurName}})
							},1500)
						}else{
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			//智能推荐
			recoMmend(){
				this.isLoading = true
				let params ={
					access_token:localStorage.getItem('access_token'),
					recom_img:{
						[this.cuurName]: '/smart_albums/static/photos/'+this.cuurImg.split("photos/")[1],
					}
				}
				axios.post('http://wanfanji.3322.org:13478/fancyTime/recommend',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							this.img_recommended =data.img_recommended
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:'保存',query:{cuurImg:this.img_recommended,cuurName:this.cuurName}})
							},1500)
						}else{
							this.isLoading = false
							this.$toast(res.data.status.msg)
						}
					} else {

					}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			selctImg(item,index){
				this.currIndex =index
				this.filters_tmp =item.filters_tmp
			},
			shoewAll(){
				this.isAllImg=!this.isAllImg
			}
		}
	}
</script>
<style scoped>
	.swiper-container{
		overflow: inherit;
	}
	.wrap-box>>>.swiper-wrapper{
		margin-top: 30px;
	}
</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		background:rgba(0,0,0,0.9);
		position:absolute;
		width:100%;
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
			background-color:#fff;
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
			.h-btn{
				font-size:32px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(45,122,255,1);
				line-height:44px;
			}
		}
		.main{
			padding:120px 0 0;
			.banner{
				width:674px;
				height:682px;
				margin: 0 auto 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10px;
				.big-img{
					max-width:674px;
					max-height:682px;
					background: #d3adf7;
					display: block;
					text-align: center;
					border-radius: 10px;
				}
			}
			.tip{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:42px;
				text-align: right;
				padding-right: 34px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				img{
					height: 40px;
					margin-right: 15px;
				}
			}
		}
		.wrap-box{
			width: 100%;
			border-radius:30px 30px 0px 0px;
			position: absolute;
			bottom: 26px;
			overflow: hidden;
			p{
				text-align: left;
				padding: 24px;
				font-size:28px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:40px;
			}
			.items{
				padding: 0 26px;
				margin-top: 10px;
				.item{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					display: flex;
					flex-direction: column;
					width:144px;
					height: 188px;
					.ctx{
						.tip{
							width:144px;
							background:#005AED;
							border-radius:15px 15px 0px 0px;
							color:rgba(255,255,255,1);
							display: inline-block;
							font-size: 32px;
							padding-bottom: 2px;
						}
						img{
							width:144px;
							height:140px;
							display: inline-block;
							margin: 0;
							vertical-align:top;
							border-radius:0px 0px 20px 20px;
						}
					}
					.active{
						position: absolute;
						top: -24px;
						border-radius: 15px;
						border: solid #fff 3px;
						border-bottom: none;
						overflow: hidden;
						width:144px;
					}
				}

			}
		}
	}
</style>
