module.exports = {
  devServer:{
    port: process.env.DEV_SERVER_PORT || 8080,  // 配置应用端口
    // proxy:{
		// 	'': {
		// 		target: 'https://music-api-virid.vercel.app',
    //     changeOrigin: true,
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