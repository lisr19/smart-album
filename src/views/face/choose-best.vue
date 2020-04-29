<template>
	<div class="page">
		<div class="head-bar">
			<img  src="@/assets/img/back.png" @click="$router.back()">
			<div class="icon">
				<span v-if="isAll" @click="cancel">取消</span>
				<span v-else @click="choiceAll">全选</span>
<!--				<span @click="comfn" style="margin-left:40px;color:#2D7AFF">确定</span>-->
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
		<div class="btn" @click="openDetail">
			<img src="@/assets/img/icon8.png" alt="">
			{{typeName}}
		</div>
<!--		<div class="btn" @click="openPF">评分</div>-->
		<loading v-if="isLoading"></loading>
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
			}),
		},
		data(){
			return{
				typeName:'',
				cuurImg:null,
				isAll: false,
				human_list:{},
				isLoading:false,
				selItemList:[]
			}
		},
		created(){
			this.imgList.forEach((item)=>{
				this.$set(item, 'checked', false)
				this.isAll =false
			})
			if(this.$route.query.from==='聚类'){
				this.typeName = "开始聚类"
			}else {
				this.typeName = "开始择优"
			}
		},
		mounted(){
		},

		methods:{
			openPF(){
				if(!this.selItemList.length){
					this.$toast('请选择图片')
					return
				}
				this.human_list = {}
				this.selItemList.forEach((i)=>{
					let name =i.name
					this.human_list[name] =  '/home/cyfee/my_project/web/smart_albums/static/photos/'+i.picUrl.split("photos/")[1]
				})
				let params ={
					access_token:localStorage.getItem('access_token'),
					choiceimg_list:this.human_list
				}
				this.isLoading = true
				axios.post('http://wanfanji.3322.org:13478/image_chooser/img_score',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							let score = data.score
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:'评分',query:{from:'评分'},params:{score:score,imgList:this.selItemList}})
							},500)
						}else{
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			//择优请求
			getImgBest(){
				if(!this.selItemList.length){
					this.$toast('请选择图片')
					return
				}
				this.human_list = {}
				this.selItemList.forEach((i)=>{
					let name =i.name
					this.human_list[name] =  '/home/cyfee/my_project/web/smart_albums/static/photos/'+i.picUrl.split("photos/")[1]
				})
				let params ={
					access_token:localStorage.getItem('access_token'),
					choiceimg_list:this.human_list
				}
				this.isLoading = true
				axios.post('http://wanfanji.3322.org:13478/image_chooser/img_best',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							let best_img = data.best_img
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:'择优结果',params:{best_img:best_img}})
							},500)
						}else{
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			//聚类请求
			clusterDetail(){
				this.human_list = {}
				this.selItemList.forEach((i)=>{
					let name =i.name
					this.human_list[name] =  '/home/cyfee/my_project/web/smart_albums/static/photos/'+i.picUrl.split("photos/")[1]
				})
				let params ={
					access_token:localStorage.getItem('access_token'),
					human_list:this.human_list
				}
				this.isLoading = true
				axios.post('http://wanfanji.3322.org:13478/people_album/cluster',params).then((res)=> {
					if (res.status == "200") {
						if(res.data.status.code===0){
							let data = res.data.data
							let class_result = data.class_result
							let class_num = data.class_num
							setTimeout(()=>{
								this.isLoading = false
								this.$router.push({name:'聚类',params:{class_result:class_result,class_num:class_num}})
							},500)
						}else{
							this.isLoading = false
							this.$toast(res.data.status.msg)
						}
					} else {}
				}).catch( (res) =>{
					console.log(res);
				})
			},
			openDetail(){
				if(this.typeName === "开始择优"){
					this.getImgBest()
					// this.$router.push({name:'择优结果'})
				}else {
					this.clusterDetail()
				}

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
			cancel(){
				this.selItemList=[]
				this.imgList.forEach((item)=>{
					this.$set(item, 'checked', false)
					this.isAll =false
				})
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
			/*background-color: #ffffff;*/
			/*z-index: 99;*/
			/*box-sizing: border-box;*/
			/*position: fixed;*/
			/*width: 100%;*/
			line-height: 120px;
			height: 120px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			padding: 0 38px;
			display: flex;
			top: 0;
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
		.main{
			/*height: 850px;*/
			/*overflow: auto;*/
			/*padding: 120px 0 ;*/
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
						top:-3px;
						right:1px;
						font-size: 38px;
					}
				}
				.checked{
					background:none;
				}
			}

		}
		.btn{
			width:336px;
			height:106px;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 8px 0px rgba(133,134,137,0.23);
			border-radius:20px;
			margin: 0 auto;
			position: absolute;
			left: 28%;
			bottom: 64px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:32px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(45,122,255,1);
			img{
				width: 50px;
				margin-right: 10px;
			}
		}
	}
</style>
