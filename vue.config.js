module.exports = {
  devServer:{
    disableHostCheck: true,
    port: process.env.DEV_SERVER_PORT || 8080,  // 配置应用端口
    // proxy:{
		// 	'^/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite:{
    //       '^/api': ''
    //     }
		// 	}
		// }
  },
  // css:{
  //   loaderOptions:{
  //     scss:{
  //       prependData: `@import "~@/styles/mixins.scss";`
  //     }
  //   }
  // }
}