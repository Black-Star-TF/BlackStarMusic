import axios from "axios";
const instance = axios.create({
  // baseURL: 'http://101.43.104.37:3000',
  baseURL: "http://localhost:3000",
  timeout: 30000,
  withCredentials: true,
});

// 添加拦截器
instance.interceptors.request.use(
  config => {
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
