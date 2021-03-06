import axios from "axios";
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: true,
});

// 添加拦截器
instance.interceptors.request.use(
  config => {
    if(config.params){
      config.params.timestamp = new Date().getTime()
    }else{
      config.params = {
        timestamp: new Date().getTime()
      }
    }
    return config;
    // TODO
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);

// 导出
export default instance;
