module.exports = {
  devServer: {
    disableHostCheck: true,
    port: process.env.DEV_SERVER_PORT || 8080, // 配置应用端口
  },
};
