module.exports = {
	// 选项...
	publicPath: './', //发布路径,用相对路径，不然会报错
	lintOnSave: false, //是否开启eslint校验
	// devServer: {
	// 	proxy: { //配置代理，解决跨域请求后台数据的问题
	// 		'/api': {
	// 			target: 'http://120.24.0.130:11002/', //后台接口
	// 			// target: 'http://192.168.4.55:3478', //后台接口
	// 			ws: true, //是否跨域
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/api':'/'
	// 			}
	// 		}
	// 	}
	// }

}