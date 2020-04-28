import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '首页',
		component: () => import('@/views/index/index.vue')
	},
	{
		path: '/index',
		name: '相册首页',
		component: () => import('@/views/index/index.vue')
	},
	{
		path: '/face',
		name: '人脸',
		component: () => import('@/views/face/index.vue')
	},
	{
		path: '/clustering',
		name: '聚类',
		component: () => import('@/views/face/clustering.vue')
	},
	{
		path: '/compare',
		name: '对比',
		component: () => import('@/views/face/compare.vue')
	},
	{
		path: '/result',
		name: '对比结果',
		component: () => import('@/views/face/result.vue')
	},
	{
		path: '/success',
		name: '保存成功',
		component: () => import('@/views/common/success.vue')
	},
	{
		path: '/filter',
		name: '过滤',
		component: () => import('@/views/face/filter.vue')
	},
	{
		path: '/choose-best',
		name: '选择',
		component: () => import('@/views/face/choose-best.vue')
	},
	{
		path: '/choose-result',
		name: '择优结果',
		component: () => import('@/views/face/choose-result.vue')
	},
	{
		path: '/save-img',
		name: '保存',
		component: () => import('@/views/face/save-img.vue')
	},
	{
		path: '/choice',
		name: '智能选图',
		component: () => import('@/views/choiceImg/index.vue')
	},

	{
		path: '/score',
		name: '评分',
		meta: { keepAlive: true },
		component: () => import('@/views/choiceImg/score.vue')
	},
	{
		path: '/full-img',
		name: '全图',
		component: () => import('@/views/choiceImg/full-img.vue')
	},
	{
		path: '/video',
		name: '视频',
		component: () => import('@/views/video/video.vue')
	},
	{
		path: '/video-detail',
		name: '生成视频',
		component: () => import('@/views/video/v-detail.vue')
	},
]

const router = new VueRouter({
	routes
})

export default router
