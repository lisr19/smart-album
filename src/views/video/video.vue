<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
			<div class="icon">
				<span v-if="!isEdit" @click="isEdit=true">选择</span>
				<template v-else>
					<span v-if="isAll" @click="cancel">取消</span>
					<span v-else @click="choiceAll">全选</span>
					<span @click="comfn" style="margin-left: 40px">确定</span>
				</template>
			</div>
		</div>
		<div  class="main">
			<div class="img-box">
				<div class="img-item" v-for="(item,index) in imgList"  @click="choiceImg(item,index)" >
					<img :src="item.picUrl" alt="" >
					<span v-if="isEdit" :class="{checked:item.checked}" class="dot" >
						<van-icon color="#2D7AFF" v-if="item.checked"  name="checked" />
					</span>
				</div>
			</div>
		</div>
		<div class="foot">
			<div class="wrap-box">
				<p>选择滤镜</p>
				<swiper class="items" :options="swiperOption" ref="mySwiper">
					<!-- slides -->
					<swiper-slide class="item" v-for="(item,index) in colorList" :key="index">
						<div class="ctx" :class="{active:currIndex===index}" @click.stop="selctImg(item,index)">
							<span class="tip">{{item.filters_tmp}}</span>
							<img :src="item.color" alt="" >
						</div>

					</swiper-slide>
				</swiper>
			</div>
		</div>
		<loading v-if="showLoading"></loading>
	</div>
</template>
<script>
	import {mapState} from "vuex";
	import loading from '@/components/loading/loading2'
	import {Toast} from "vant";
	export default {
		components:{
			Toast,
			loading
		},
		computed:{
			...mapState({
				imgList:state=>state.user.imgList,
			}),
		},
		data(){
			return{
				showLoading:false,
				currIndex:0,
				currImg:false,
				showImg:false,
				isEdit:false,
				isAll: false,
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
				selItemList:[],
				filters_tmp:'Duke',
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					loop:false
				},
			}
		},
		created(){
			this.cancel()
		},
		mounted(){
		},
		methods:{
			comfn(){
				if(!this.selItemList.length){
					this.$toast('请选择图片')
					return
				}
				this.showLoading = true
				setTimeout(()=>{
					this.human_list = {}
					this.selItemList.forEach((i)=>{
						let name =i.name
						this.human_list[name] =  '/home/cyfee/my_project/web/smart_albums/static/photos/'+i.picUrl.split("photos/")[1]
					})
					let params ={
						access_token:localStorage.getItem('access_token'),
						vid_list:this.human_list,
						filters_tmp:this.filters_tmp,
						closeup_tmp:'closeUp',
					}
					console.log(params);
					axios.post('http://wanfanji.3322.org:13478/fancyTime/img2video',params).then((res)=> {
						if (res.status == "200") {
							if(res.data.status.code===0){
								let data = res.data.data
								this.showLoading = false
								this.$router.push({name:'生成视频',query:{videoUrl:data.video_add}})
							}else{
								this.$toast(res.data.status.msg)
							}
						} else {
						}
					}).catch( (res) =>{
						setTimeout(()=>{
							this.showLoading = false
							this.$toast('接口失败')
						},1000)
						console.log(res);
					})
				},5000)
				console.log(this.selItemList);
			},
			selctImg(item,index){
				this.currIndex =index
				this.filters_tmp = item.filters_tmp
				console.log(this.filters_tmp);
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
	.van-tabbar--fixed{
		height: 100px;
	}
	.swiper-container{
		overflow: inherit;
	}
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
				width:180px;
				height:180px;
				margin: 5px 3px;
				img{
					width:180px;
					height:180px;
					display:block;
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
						top:-2px;
						right:0px;
						font-size: 38px;
						border-radius: 50%;
					}
				}
				.checked{
					background: none;
				}
			}
		}
		.foot{
			background:rgba(250,250,250,1);
			bottom: 0;
			z-index: 99;
			position: fixed;
			display: flex;
			align-items: center;
			width: 100%;
		}
		.wrap-box{
			height:306px;
			width: 100%;
			background: #aaaaaa;
			border-radius:30px 30px 0px 0px;
			box-shadow:0px 4px 8px 0px rgba(210,227,255,1);
			p{
				text-align: left;
				padding: 24px;
				font-size:28px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:#ffffff;
				line-height:40px;
			}
			.items{
				padding: 0 42px;
				margin-top: 10px;
				.item{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					display: flex;
					flex-direction: column;
					width:144px;
					.ctx{
						.tip{
							width:144px;
							background:#005AED;
							border-radius:20px 20px 0px 0px;
							color:rgba(255,255,255,1);
							display: inline-block;
							font-size: 32px;
							padding-bottom: 3px;
						}
						img{
							width:144px;
							height:144px;
							display: inline-block;
							margin: 0;
						}
					}
					.active{
						position: absolute;
						top: -24px;
					}
				}

			}
		}
		.load{
			position: fixed;
			width: 100%;
			height: 100%;
			display: block;
			top: 0;
			left: 0;
			z-index: 9998;
		}
	}
</style>
