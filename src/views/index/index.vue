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
				inforList:[
						{"id":8174,"start_time":1600058375000,"end_time":1600062598000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":76610,"total_distance":1525,"total_duration":1110,"total_steps":2228,"value_max":0,"value_min":0,"info_1":2228,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 17:06:50"},{"id":8155,"start_time":1600055076000,"end_time":1600055107000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":911,"total_distance":17.4531,"total_duration":11,"total_steps":28,"value_max":0,"value_min":0,"info_1":28,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},
					{"id":8156,"start_time":1600048951000,"end_time":1600049127000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":6775,"total_distance":131.602,"total_duration":112,"total_steps":199,"value_max":0,"value_min":0,"info_1":199,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8157,"start_time":1600045181000,"end_time":1600045486000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":17732,"total_distance":369.203,"total_duration":188,"total_steps":430,"value_max":0,"value_min":0,"info_1":374,"info_2":56,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8158,"start_time":1600043980000,"end_time":1600043985000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":395,"total_distance":6.60156,"total_duration":5,"total_steps":16,"value_max":0,"value_min":0,"info_1":16,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8159,"start_time":1600040156000,"end_time":1600042764000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":34346,"total_distance":924.039,"total_duration":391,"total_steps":1046,"value_max":0,"value_min":0,"info_1":1036,"info_2":10,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8160,"start_time":1600014789000,"end_time":1600014793000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":314,"total_distance":5.67969,"total_duration":4,"total_steps":10,"value_max":0,"value_min":0,"info_1":10,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8161,"start_time":1600002656000,"end_time":1600003694000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":25808,"total_distance":498.562,"total_duration":440,"total_steps":767,"value_max":0,"value_min":0,"info_1":767,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8162,"start_time":1599999434000,"end_time":1599999721000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":517,"total_distance":9.32812,"total_duration":6,"total_steps":17,"value_max":0,"value_min":0,"info_1":17,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8163,"start_time":1599996288000,"end_time":1599997414000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":5518,"total_distance":104.359,"total_duration":61,"total_steps":147,"value_max":0,"value_min":0,"info_1":116,"info_2":31,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8164,"start_time":1599995341000,"end_time":1599995341001,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":251,"total_distance":4.54688,"total_duration":0,"total_steps":8,"value_max":0,"value_min":0,"info_1":8,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8165,"start_time":1599991506000,"end_time":1599994383000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":20978,"total_distance":426.086,"total_duration":239,"total_steps":560,"value_max":0,"value_min":0,"info_1":492,"info_2":68,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8166,"start_time":1599987889000,"end_time":1599988524000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":3192,"total_distance":60.875,"total_duration":42,"total_steps":96,"value_max":0,"value_min":0,"info_1":96,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8167,"start_time":1599986883000,"end_time":1599987178000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":2992,"total_distance":70.8984,"total_duration":34,"total_steps":87,"value_max":0,"value_min":0,"info_1":87,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8168,"start_time":1599977574000,"end_time":1599978485001,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":2488,"total_distance":47.7266,"total_duration":19,"total_steps":78,"value_max":0,"value_min":0,"info_1":78,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8169,"start_time":1599976271000,"end_time":1599976292000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":813,"total_distance":14.8359,"total_duration":15,"total_steps":27,"value_max":0,"value_min":0,"info_1":27,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8170,"start_time":1599974576000,"end_time":1599975234000,"action_type":"WALK","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":0,"timezone":8,"total_calories":1671,"total_distance":30.4609,"total_duration":14,"total_steps":54,"value_max":0,"value_min":0,"info_1":43,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8171,"start_time":1599924494998,"end_time":1599953749999,"action_type":"SLEEP","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":11376,"restless":17879,"timezone":8,"total_calories":0,"total_distance":0,"total_duration":0,"total_steps":0,"value_max":0,"value_min":0,"info_1":0,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8172,"start_time":1599839274998,"end_time":1599867262999,"action_type":"SLEEP","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":4759,"restless":23229,"timezone":8,"total_calories":0,"total_distance":0,"total_duration":0,"total_steps":0,"value_max":0,"value_min":0,"info_1":0,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"},{"id":8173,"start_time":1599837769998,"end_time":1599838791999,"action_type":"SLEEP","credential_id":null,"daylight_saving_time":0,"awake":0,"fall_asleep":0,"restless":1022,"timezone":8,"total_calories":0,"total_distance":0,"total_duration":0,"total_steps":0,"value_max":0,"value_min":0,"info_1":0,"info_2":0,"info_3":null,"info_4":null,"uid":37,"create_time":"2020-09-14 15:48:20"}],"heartbeat":[{"id":1102,"type":"heartbeat","timezone":0,"value":87,"check_time":1600074545000,"start_time":0,"end_time":0,"credential_id":null,"daylight_saving_time":0,"dirty":0,"request_id":null,"data_type":"0","info_1":"0","info_2":"0","uid":37,"create_time":"2020-09-14 17:09:23"},{"id":1103,"type":"heartbeat","timezone":0,"value":74,"check_time":1600074488000,"start_time":0,"end_time":0,"credential_id":null,"daylight_saving_time":0,"dirty":0,"request_id":null,"data_type":"0","info_1":"0","info_2":"0","uid":37,"create_time":"2020-09-14 17:09:23"},{"id":1099,"type":"heartbeat","timezone":0,"value":62,"check_time":1600014931000,"start_time":0,"end_time":0,"credential_id":null,"daylight_saving_time":0,"dirty":0,"request_id":null,"data_type":"0","info_1":"0","info_2":"0","uid":37,"create_time":"2020-09-14 15:48:20"},{"id":1100,"type":"heartbeat","timezone":0,"value":84,"check_time":1600013762000,"start_time":0,"end_time":0,"credential_id":null,"daylight_saving_time":0,"dirty":0,"request_id":null,"data_type":"0","info_1":"0","info_2":"0","uid":37,"create_time":"2020-09-14 15:48:20"},{"id":1101,"type":"heartbeat","timezone":0,"value":83,"check_time":1599981921000,"start_time":0,"end_time":0,"credential_id":null,"daylight_saving_time":0,"dirty":0,"request_id":null,"data_type":"0","info_1":"0","info_2":"0","uid":37,"create_time":"2020-09-14 15:48:20"}],
				showImg:false,
				imgList:[],
				img_list: {
				'12.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.546526712.jpg',
				'1.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.55844021.jpg',
				'10.jpg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.572965610.jpg',
				'6.jpg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.5784786.jpg',
				'11.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.582394811.jpg',
				'17.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.58978517.jpg',
				'13.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.600960313.jpg',
				'7.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.6113997.jpg',
				'16.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.617148216.jpg',
				'3.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.62247133.jpg',
				'8.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.63542278.jpg',
				'21.png': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.642549521.jpg',
				'4.jpg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.64805874.jpg',
				'5.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.65301515.jpg',
				'15.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.673197715.jpg',
				'19.png': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.681083419.jpg',
				'18.png': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.68909618.jpg',
				'20.png': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.697167220.jpg',
				'2.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.70333722.jpg',
				'14.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.709238314.jpg',
				'9.jpeg': '/smart_albums/static/photos/xMiIsQy01MXT9sv/xMiIsQy01MXT9sv1606303672.7247439.jpg'},
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

			// this.inforList = JSON.parse(JSON.stringify(this.inforList))
			console.log(this.inforList);
			let footCountData = []
			let walking = []
			let total_calories = []
			let total_distance = []
			let total_duration = []
			this.inforList.forEach((item,index)=>{
				walking.push(item.total_steps)
				total_calories.push(item.total_calories)
				total_distance.push(item.total_distance)
				total_duration.push(item.total_duration)
			})
			walking=eval(walking.join("+"))
			total_calories=eval(total_calories.join("+"))
			total_distance=eval(total_distance.join("+"))
			total_duration=eval(total_duration.join("+"))
			console.log(walking);
			console.log(total_calories);
			console.log(total_distance);
			console.log(total_duration);
			// console.log(walking);
			// var temp = {};
			// for(var i in this.inforList) {
			// 	var key= this.inforList[i].action_type;
			// 	if(temp[key]) {
			// 		temp[key].total_steps = temp[key].total_steps+ this.inforList[i].total_steps;
			// 		temp[key].total_distance = temp[key].total_distance+ this.inforList[i].total_distance;
			// 		temp[key].total_calories = temp[key].total_calories+ this.inforList[i].total_calories;
			// 	} else {
			// 		temp[key] = {};
			// 		temp[key].total_steps = this.inforList[i].total_steps;
			// 	}
			// }
			// for(var k in temp){
			// 	footCountData.push(temp[k])
			// }
			// console.log(footCountData);
		},
		methods:{
			// 	axios.get('/index/watchList',{
			// 		uid:37,
			// 		date:'2020-09-14',
			// 		action_type:'WALK'
			// 	}).then((res)=> {
			// 		if (res.status == "200") {
			//
			// 		} else {}
			// 	}).catch( (res) =>{
			// 		console.log(res);
			// 	})
			// },
			...mapActions([
				'setImgList',
				'setCopyImgList'
			]),
			openItem(item,index){
				this.cuurImg = item.picUrl
				this.cuurName = item.name
				this.currIndex =index
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
