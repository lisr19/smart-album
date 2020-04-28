import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default {
	state: {
		imgList:[],
		faceImgList:[],
		copy_img_list:{}
	},
	mutations:{
		setImgList(state, data) {
			state.imgList= data
		},
		setCopyImgList(state, data) {
			state.copy_img_list= data
		},
		setFaceImgList(state, data) {
			state.faceImgList= data
		},
	},
	getters: {},
	actions: {
		setImgList(context, data) {
			context.commit('setImgList', data)
		},
		setCopyImgList(context, data) {
			context.commit('setCopyImgList', data)
		},
		setFaceImgList(context, data) {
			context.commit('setFaceImgList', data)
		},
	}
}
