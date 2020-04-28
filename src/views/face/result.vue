<template>
	<div class="page">
		<div class="head-bar">
			<img src="@/assets/img/back.png" alt="" @click="$router.back()">
			<img src="@/assets/img/menu.png" >
		</div>
		<div class="main">
			<div class="items">
				<div class="item" v-for="(item,index) in selItemList">
					<img :src="item.picUrl" alt="">
				</div>
			</div>
			<p class="tip">{{compareData.msg}}</p>
			<div class="chart-box">
				<div id="chart1" ref="myChart" style="width:100%;height:336px"></div>
				<div class="ad-tip">
					<div>
						{{(compareData.similarity_degree*100).toFixed(1)}}<span>%</span>
					</div>
					<p>相似度</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				showTip:false,
				selItemList:[],
				compareData:{},
			}
		},
		created() {
			this.selItemList = this.$route.query.selItemList
			this.compareData = this.$route.query.compareData
			console.log(this.selItemList);
			console.log(this.compareData);
		},
		mounted() {
			this.chartShow()
		},
		methods: {
			chartShow() {
				let myChart = this.$echarts.init(this.$refs.myChart)
				// 绘制图表
				myChart.setOption({
					color:	['#2D7AFF','#f4f3e4'],
					series: [
						{
							type: 'pie',
							radius: ['58%', '65%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center',
									// formatter:'相似度',
									textStyle: {
										color: '#999999',
										fontSize: 24
									}
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [
								{value: 95},
								{value: 5},
							]
						}
					]
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.page{
		min-height: 100%;
		.head-bar{
			line-height: 150px;
			height: 150px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			padding: 0 48px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			img{
				height:60px;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.main{
			.items{
				display: flex;
				align-items: center;
				justify-content: center;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					img{
						width:346px;
						height:432px;
						display: inline-block;
						border-radius: 8px;
					}
					.up-btn{
						width:346px;
						height:48px;
						background:rgba(255,255,255,1);
						border-radius:10px;
						border:2px solid rgba(214,214,214,1);
						text-align: center;
						margin-top: 10px;
						line-height: 48px;
					}
				}
				.item:first-child{
					margin-right: 10px;
				}
			}
			.tip{
				font-size:26px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(114,114,114,1);
				height:80px;
				line-height: 80px;
				background:rgba(242,242,242,1);
				text-align: center;
				margin: 30px 30px 0 30px;
				border-radius: 10px;
			}
			.chart-box{
				position: relative;
				margin-top: -80px;
				.ad-tip{
					position: absolute;
					top: 25%;
					left: 28%;
					color: #2D7AFF;
					font-size: 100px;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width:332px;
					height:332px;
					background:rgba(255,255,255,1);
					box-shadow:0px 4px 8px 0px rgba(202,221,254,1);
					border-radius: 50%;
					span{
						font-size: 45px;
					}
					p{
						font-size:36px;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
						line-height:50px;
						margin-top: 5px;
					}
				}
			}
		}
	}
</style>