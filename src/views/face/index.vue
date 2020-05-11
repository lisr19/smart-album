<template>
	<div class="page"  @click="showTip=false">
		<div class="head-bar">
			<img src="@/assets/img/back.png" @click="$router.back()">
			<div style="display: flex;align-items: center">
				<img src="@/assets/img/all.png" @click.stop="shoewAll" style="margin-right: 30px">
				<img src="@/assets/img/menu.png"  @click.stop="showTip=!showTip">
				<div class="tip-box" v-if="showTip">
					<p >教程</p>
					<p >设置</p>
					<p >帮助&反馈</p>
				</div>
			</div>
		</div>
		<div class="main">
			<template v-if="!isAllImg">
				<div class="banner">
					<img class="big-img" :src="cuurImg" alt="">
				</div>
				<div class="wrap-box">
					<swiper class="items" :options="swiperOption" ref="mySwiper">
						<!-- slides -->
						<swiper-slide class="item" v-for="(item,index) in imgList" :key="index"  data-index="index" >
							<img :class="{active:currIndex===index}"  :src="item.picUrl" alt=""  @click.stop="selctImg(item,index)">
							<!--<p>{{item.name}}</p>-->
						</swiper-slide>
					</swiper>

				</div>
			</template>
			<template v-else>
				<div class="img-box" style="padding-bottom: 80px">
					<div class="img-item" v-for="(item,index) in imgList"  @click="openItem(item,index)">
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</template>
		</div>
		<van-tabbar v-model="active" @change="">
			<van-tabbar-item  @click="tabNav('对比')" >
				<span style="color: #2D7AFF">人脸对比</span>
				<img slot="icon" src="@/assets/img/icon4.png">
			</van-tabbar-item>
			<van-tabbar-item icon="search"  @click="tabNav('过滤')"
			>
				<span style="color: #2D7AFF">滤镜效果</span>
				<img slot="icon" src="@/assets/img/icon5.png">
			</van-tabbar-item>
			<van-tabbar-item @click="tabNav('大头照')">
				<span style="color: #2D7AFF">人脸特写</span>
				<img slot="icon" src="@/assets/img/icon6.png">
			</van-tabbar-item>
			<van-tabbar-item @click="tabNav('聚类')">
				<span style="color: #2D7AFF">人脸聚类</span>
				<img slot="icon" src="@/assets/img/icon7.png">
			</van-tabbar-item>
		</van-tabbar>
		<loading v-if="isLoading"></loading>
		<van-overlay :show="showImg" @click="showImg = false" >
			<div class="show-img-box">
				<img :src="cuurImg" alt="">
			</div>
		</van-overlay>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import loading from '@/components/loading/loading'
	export default {

		components:{
			loading
		},
		computed:{
			...mapState({
				imgList:state=>state.user.imgList,
				copy_img_list:state=>state.user.copy_img_list,
			}),
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		data(){
			return{
				showImg:false,
				showTip:false,
				fileList: [],
				img_closeuped:'',
				showTwo:false,
				isLoading:false,
				isAllImg:false,
				cuurImg:'',
				cuurName:'',
				currIndex:0,
				active: 0,
				icon: {
					active: 'https://img.yzcdn.cn/vant/user-active.png',
					inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
				},
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					observer: true,
					observeParents: false,
					on: {
						//监听滑动切换事件，返回swiper对象
						slideChange: () => {
							let swiper = this.$refs.mySwiper.swiper;
							console.log(swiper.activeIndex); //滑动打印当前索引
						},
					},
				}
			}
		},
		created(){
			this.cuurImg = this.imgList[0].picUrl
			this.cuurName = this.imgList[0].name
			this.access_token = localStorage.getItem('access_token')
		},
		activated(){
			if(!this.cuurImg){
				this.cuurImg = this.imgList[0].picUrl
				this.cuurName = this.imgList[0].name
				this.currIndex =0
			}
			// this.swiper.slideTo(3, 1000, false); //手动跳到指定页
		},
		methods:{
			openItem(item,index){
				this.cuurImg = item.picUrl
				this.cuurName = item.name
				this.currIndex =index
				this.showImg  =true
			},
			tabNav(type){
				console.log(type);
				if(type==='过滤'){
					this.$router.push({name:'过滤',query:{cuurImg:this.cuurImg,cuurName:this.cuurName}})
				}else if(type==='大头照'){
					this.openDTZ()
					// this.openClus()
				}else if(type==='聚类'){
					this.$router.push({name:'选择',query:{from:'聚类'}})
				}else {
					this.$router.push({name:'对比'})
				}
			},
			upFaceImg(){
				this.isLoading = true
				this.title = '筛选人脸图片中…'
				setTimeout(()=>{
					let params ={
						access_token:localStorage.getItem('access_token'),
						choiceimg_list:this.copy_img_list
					}
					axios.post('http://wanfanji.3322.org:13478/people_album/human_list',params).then((res)=> {
						if (res.status == "200") {
							if(res.data.status.code===0){
								let data = res.data.data
								this.img_list = data.human_list
								this.isLoading = false
								setTimeout(()=>{
									this.initImg()
								},500)
							}else{
								this.isLoading = false
								this.$toast(res.data.status.msg)
							}
						} else {
						}
					}).catch( (res) =>{
						setTimeout(()=>{
							this.isLoading = false
							this.$toast('接口失败')
						},500)
						console.log(res);
					})
				},5000)
			},
			initImg(){
				let arr = []
				for (let i in this.img_list) {
					let o={
						name:i,
						picUrl:'http://wanfanji.3322.org:13478/'+this.img_list[i].split("smart_albums/")[1]
					};
					arr.push(o)
				}
				this.imgList = arr
				this.$store.dispatch('setFaceImgList',this.imgList)
				console.log(this.imgList);
				this.cuurImg = this.imgList[0].picUrl
				this.cuurName = this.imgList[0].name
			},
			//大头照
			openDTZ(){
				this.isLoading = true
				setTimeout(()=>{
					let params ={
						access_token:localStorage.getItem('access_token'),
						face_img:{
							[this.cuurName]: '/home/cyfee/my_project/web/smart_albums/static/photos/'+this.cuurImg.split("photos/")[1],
							// [this.cuurName]: '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/'+this.cuurImg.split("xMiIsQy01MuycJB/")[1],
						}
					}
					axios.post('http://wanfanji.3322.org:13478/people_album/detector',params).then((res)=> {
						if (res.status == "200") {
							if(res.data.status.code===0){
								let data = res.data.data
								this.face_list =data.face_list
								setTimeout(()=>{
									this.isLoading = false
									this.$router.push({name:'大头照',params:{face_list:this.face_list}})
								},1500)
							}else if(res.data.status.code===-1){
								this.isLoading = false
								this.$toast(res.data.data.msg)
							}else{
								this.isLoading = false
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
			//特写
			openClus(){
				this.isLoading = true
				setTimeout(()=>{
					let params ={
						access_token:localStorage.getItem('access_token'),
						closeup_img:{
							[this.cuurName]: '/home/cyfee/my_project/web/smart_albums/static/photos/'+this.cuurImg.split("photos/")[1],
							// [this.cuurName]: '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/'+this.cuurImg.split("xMiIsQy01MuycJB/")[1],
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
			selctImg(item,index){
				this.cuurImg = item.picUrl
				this.cuurName = item.name
				this.currIndex =index
			},
			shoewAll(){
				this.isAllImg=!this.isAllImg
			}
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
			position: fixed;
			width: 100%;
			box-sizing: border-box;
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
				height: 60px;
				z-index: 2;
				justify-self: flex-end;
			}
			.tip-box{
				width:276px;
				background:rgba(106,106,106,1);
				position: absolute;
				right: 32px;
				top: 120px;
				border-radius: 20px;
				padding:10px 35px;
				box-sizing: border-box;
				font-size:32px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:44px;
				p{
					text-align: left;
					font-size:32px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					line-height:88px;
				}
				p:first-child{
					border-bottom:solid 2px #626262 ;
				}
			}
		}
		.main{
			padding:150px 0 0;
			.banner{
				width:674px;
				height:682px;
				background-color: #f8f8f8;
				margin: 30px auto 90px;
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
			.wrap-box{
				/*overflow: hidden;*/
				position: relative;
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
			.wrap-box::after{
				content: '';
				width: 200%;
				height: 200%;
				position: absolute;
				top: 0;
				left: 0;
				border: 1px solid #B3B3B3;
				border-radius: 4px;
				-webkit-transform: scale(0.5,0.5);
				transform: scale(0.5,0.5);
				-webkit-transform-origin: top left;
			}
		}
		.img-box{
			display: flex;
			flex-wrap: wrap;
			img{
				width:180px;
				height:180px;
				display: inline-block;
				margin: 3px;
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
