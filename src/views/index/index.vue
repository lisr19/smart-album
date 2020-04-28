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
				<img class="big-img" :src="cuurImg" alt="">
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
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in imgList">
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
				imgList:[],
				img_list:
					{
						'test_photo.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01Ml17l3/xMiIsQy01Ml17l31587951962.8595304t_photo.jpg',
						'G0827-NT-009.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.6162713-NT-009.jpg',
						'1596353.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.62103221596353.jpg',
						'981jjdn.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.6261158981jjdn.jpg',
						'192000_2.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.632459492000_2.jpg',
						'2409umb.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.64124352409umb.jpg',
						'01e70000sh.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.64755170000sh.jpg',
						'G0fdhr329.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.7108665fdhr329.jpg',
						'mjjq-photos-900.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.719134tos-900.jpg',
						'1928074_2.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.723315228074_2.jpg',
						'13-1P614162A8.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.72973614162A8.jpg',
						'20172072085.jpg': '/home/cyfee/my_project/web/smart_albums/static/photos/xMiIsQy01MuycJB/xMiIsQy01MuycJB1584068052.735292072085.jpg'
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
			.big-img{
				width:674px;
				height:682px;
				background: #d3adf7;
				display: block;
				margin: 30px auto 90px;
				text-align: center;
				border-radius: 10px;
				overflow: hidden;
			}
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
	}
</style>
