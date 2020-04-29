<template>
	<div class="page" @click="showTip=false">
		<div class="head-bar">
			<img src="@/assets/img/all.png" @click.stop="shoewAll">
			<img src="@/assets/img/menu.png"  @click.stop="showTip=!showTip">
			<div class="tip-box" v-if="showTip" @click.stop="showTip=true">
				<p >教程</p>
				<p >设置</p>
				<p >帮助&反馈</p>
			</div>
		</div>
		<div class="main">
			<template v-if="isAllImg">
				<div class="banner">
					<img class="big-img" :src="cuurImg" alt="">
				</div>

				<div class="wrap-box">
					<swiper class="items" :options="swiperOption" ref="mySwiper">
						<!-- slides -->
						<swiper-slide class="item" v-for="(item,index) in imgList" :key="index">
							<img :class="{active:currIndex===index}"  :src="item.picUrl" alt=""  @click.stop="selctImg(item,index)">
							<!--<p>{{item.name}}</p>-->
						</swiper-slide>
					</swiper>
				</div>
			</template>
			<template v-else>
				<div class="img-box" >
					<div class="img-item" v-for="(item,index) in imgList" @click="openItem(item,index)">
						<img :src="item.picUrl" alt="" >
					</div>
				</div>
			</template>
		</div>
		<van-tabbar v-model="active" @change="">
			<van-tabbar-item @click="openTwo">
				<span>人物相册</span>
				<img
					slot="icon"
					slot-scope="props"
					:src="props.active ? icon.active : icon.inactive"
				>
			</van-tabbar-item>
			<van-tabbar-item  @click="openDetail('智能选图')">
				<span style="color: #2D7AFF">智能选图</span>
				<img
					slot="icon"
					:src="icon2"
				>
			</van-tabbar-item>
			<van-tabbar-item  @click="openDetail('视频')">
				<span style="color: #2D7AFF">精彩视频</span>
				<img
						slot="icon"
						:src="icon3"
				>
			</van-tabbar-item>
		</van-tabbar>
		<van-overlay :show="showImg" @click="showImg = false" >
			<div class="show-img-box">
				<img :src="cuurImg" alt="">
			</div>
		</van-overlay>
<!--		<van-popup v-model="showTip" style="border-radius:8px;">-->
<!--			<div class="show-box">-->
<!--				<p>-->
<!--					<van-uploader  multiple  :after-read="upImg">-->
<!--					从设备中选择-->
<!--				</van-uploader>-->
<!--				</p>-->
<!--				<p><van-uploader capture>拍照</van-uploader>-->
<!--				</p>-->
<!--			</div>-->
<!--		</van-popup>-->
	</div>
</template>
<script>
	import {mapActions} from 'vuex'
	export default {
		data(){
			return{
				showImg:false,
				imgList:[],
				img_list:
					{
						'test_image_63.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.847759mage_63.jpg',
						'test_image_70.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8519936mage_70.jpg',
						'test_image_59.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8565636mage_59.jpg',
						'test_image_48.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8609095mage_48.jpg',
						'test_image_49.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8651414mage_49.jpg',
						'test_image_71.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8689725mage_71.jpg',
						'test_image_55.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8727832mage_55.jpg',
						'test_image_76.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.877088mage_76.jpg',
						'test_image_31.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8804927mage_31.jpg',
						'test_image_34.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8859818mage_34.jpg',
						'test_image_61.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.890363mage_61.jpg',
						'test_image_56.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8948193mage_56.jpg',
						'test_image_26.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.8989704mage_26.jpg',
						'test_image_3.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9030192image_3.jpg',
						'test_image_38.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.907025mage_38.jpg',
						'test_image_60.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9115734mage_60.jpg',
						'test_image_66.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9155607mage_66.jpg',
						'test_image_58.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.933038mage_58.jpg',
						'test_image_57.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9380085mage_57.jpg',
						'test_image_53.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9411807mage_53.jpg',
						'test_image_74.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9465215mage_74.jpg',
						'test_image_64.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9506986mage_64.jpg',
						'test_image_28.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9540644mage_28.jpg',
						'test_image_36.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9587805mage_36.jpg',
						'test_image_65.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9629776mage_65.jpg',
						'test_image_50.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9679942mage_50.jpg',
						'test_image_6.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.971901image_6.jpg',
						'test_image_72.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9758797mage_72.jpg',
						'test_image_18.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9803135mage_18.jpg',
						'test_image_75.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9849052mage_75.jpg',
						'test_image_13.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9892077mage_13.jpg',
						'test_image_69.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.9949963mage_69.jpg',
						'test_image_30.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131171.999377mage_30.jpg',
						'test_image_12.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0038006mage_12.jpg',
						'test_image_51.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0081406mage_51.jpg',
						'test_image_62.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0119867mage_62.jpg',
						'test_image_47.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.015249mage_47.jpg',
						'test_image_1.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0191739image_1.jpg',
						'test_image_24.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0233846mage_24.jpg',
						'test_image_54.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0273058mage_54.jpg',
						'test_image_37.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0315857mage_37.jpg',
						'test_image_19.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.035329mage_19.jpg',
						'test_image_35.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0415084mage_35.jpg',
						'test_image_39.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0451345mage_39.jpg',
						'test_image_29.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0494087mage_29.jpg',
						'test_image_68.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0534725mage_68.jpg',
						'test_image_67.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0586946mage_67.jpg',
						'test_image_73.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0628016mage_73.jpg',
						'test_image_33.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0674224mage_33.jpg',
						'test_image_4.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0715039image_4.jpg',
						'test_image_52.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0764544mage_52.jpg',
						'test_image_27.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.080212mage_27.jpg',
						'test_image_32.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0836833mage_32.jpg',
						'test_image_25.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuRhC_/xMiIsQy01MuRhC_1588131172.0878468mage_25.jpg'
					},
				fileList: [],
				access_token:'',
				refresh_token:'',
				showTip:false,
				showTwo:false,
				isAllImg:true,
				cuurImg:'',
				currIndex:0,
				active: 0,
				icon: {
					active: require('@/assets/img/icon1.png'),
					inactive: require('@/assets/img/icon1.png'),
				},
				icon2:require('@/assets/img/icon2.png'),
				icon3:require('@/assets/img/icon3.png'),
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
				},
			}
		},
		created(){
			this.login()
			this.initImg()

		},
		mounted(){
			this.$store.dispatch('setImgList',this.imgList)
			this.$store.dispatch('setCopyImgList',this.img_list)
		},
		methods:{
			...mapActions([
				'setImgList',
				'setCopyImgList'
			]),
			openItem(item,index){
				this.cuurImg = item.picUrl
				this.showImg  =true
			},
			login(){
				axios.post('http://wanfanji.3322.org:13478/login',{
					access_token:'',
					refresh_token:'',
					uid:'B3-4D-FC-22-6C-A3'
				}).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							this.access_token = data.access_token
							this.refresh_token = data.refresh_token
							localStorage.setItem('access_token',this.access_token)
							localStorage.setItem('refresh_token',this.refresh_token)
						}else{
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
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
				console.log(this.imgList);
				this.cuurImg = this.imgList[0].picUrl
			},
			upImg(file){
				let fileName = file.file.name
				let params={
					is_cover:false,
					access_token:this.access_token,
					img_list:{
						[fileName]:'',
					}
				}
				// params=JSON.stringify(params)
				console.log(params);
				axios.post('uploadimag',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){

						}else{
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			openDetail(item){
				if(item==='智能选图') {
					this.$router.push({name:'选择'})
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
<style>
	.van-tabbar--fixed{
		/*position: relative;*/
		height: 100px;
	}
	.van-overlay{
		z-index: 999!important;
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
			padding-top:150px ;
			.wrap-box{
				overflow: hidden;
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
		.banner{
			width:674px;
			height:682px;
			background-color: #f8f8f8;
			margin: 0 auto 120px;
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
		.img-box{
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 120px;
			img{
				width:180px;
				height:180px;
				display: inline-block;
				margin: 3px;
			}
		}
		.show-box{
			width:600px;
			height:206px;
			background:rgba(255,255,255,1);
			border-radius:16px;
			padding: 0 40px;
			overflow: hidden;
			box-sizing: border-box;
			p{
				font-size:36px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:102px;
				height: 102px;
				text-align: left;
			}
			p:first-child{
				border-bottom: solid #D8D8D8 1px;
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
