module.exports = {
  devServer:{
    port: process.env.DEV_SERVER_PORT || 8080,  // 配置应用端口
    proxy:{
			'': {
				target: 'http://127.0.0.1:3000',
        changeOrigin: true,
			}
		}
  },
  // css:{
  //   loaderOptions:{
  //     scss:{
  //       prependData: `@import "~@/styles/mixins.scss";`
  //     }
  //   }
  // }
}