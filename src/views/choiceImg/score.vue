<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
<!--			<div class="icon">-->
<!--				<span v-if="!isEdit" @click="isEdit=true">选择</span>-->
<!--				<template v-else>-->
<!--					<span @click="choiceAll">全选</span>-->
<!--					<span @click="cancel" style="margin-left: 40px">取消</span>-->
<!--				</template>-->
<!--			</div>-->
		</div>
		<div  class="main">
			<div class="img-box">
				<div class="img-item" v-for="(item,index) in imgList"  @click="choiceImg(item,index)" >
					<img :src="item.picUrl" alt="" >
<!--					<p class="score">{{item.score?(item.score*100).toFixed(2):'95.3'}}</p>-->
					<p class="score" v-if="index===index1" v-for="(item1,index1) in scoreList">{{(item1.score*100).toFixed(2)}}</p>
					<span v-if="isEdit" :class="{checked:item.checked}" class="dot">
						<van-icon color="#2D7AFF" v-if="item.checked"  name="checked"/>
					</span>
				</div>
			</div>
		</div>
<!--		<div class="foot">-->
<!--			<div class="wrap-box">-->
<!--				<swiper class="items" :options="swiperOption" ref="mySwiper">-->
<!--					&lt;!&ndash; slides &ndash;&gt;-->
<!--					<swiper-slide class="item" v-for="(item,index) in selItemList" :key="index">-->
<!--						<img  :src="item.picUrl" alt=""  @click.stop="">-->
<!--					</swiper-slide>-->
<!--				</swiper>-->
<!--			</div>-->
<!--			<div class="btn" @click="comFn">保存</div>-->
<!--		</div>-->
		<van-popup v-model="showImg">
			<div class="show-wrap">
				<img class="big-img" :src="currImg" alt="">
			</div>
		</van-popup>
	</div>
</template>
<script>
	export default {
		watch: {
			$route(to, from) {
				if(from.name==='选择'){
					this.init()
				}
			}
		},
		data(){
			return{
				score:0,
				currImg:false,
				showImg:false,
				isEdit:false,
				isAll: false,
				active:0,
				icon: {
					active: 'https://img.yzcdn.cn/vant/user-active.png',
					inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
				},
				imgList:[],
				selItemList:[],
				scoreList:[],
				swiperOption: {
					notNextTick: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					loop:false
				},
			}
		},
		created(){
			this.imgList=this.$route.params.imgList
			this.scoreList=this.$route.params.score
			let arr = []
			for(let i in this.scoreList){
				arr.push({score:this.scoreList[i]})
			}
			this.scoreList=arr
		},
		methods:{
			init(){
				this.imgList=this.$route.params.imgList
				this.scoreList=this.$route.params.score
				let arr = []
				for(let i in this.scoreList){
					arr.push({score:this.scoreList[i]})
				}
				this.scoreList=arr
			},
			comFn(){
				this.$router.push({name:'保存'})
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
					this.score = (this.scoreList[index].score*100).toFixed(2)
					this.$router.push({name:'全图', query:{cuurImg:item.picUrl,score:this.score}})
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
					opacity:0.9;
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
						top:0;
						right:0;
					}
				}
				.checked{

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
			border-top: #B3B3B3 solid 0.5px;
		}
		.wrap-box{
			height:198px;
			padding: 0 40px;
			flex: 2;
			overflow: auto;
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
			background:rgba(45,122,255,1);
			border-radius:30px;
			text-align: center;
			font-size:32px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			margin: 0 40px;
		}
		.show-wrap{
			.big-img{
				max-height:896px;
				display: block;
				border-radius: 8px;
			}
		}

	}
</style>
