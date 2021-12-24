import request from "@/utils/request.js";

// 请求推荐电台
export const getRecommendRadio = () => request.get("/dj/personalize/recommend");
// 获取电台banner
export const getRadioBanner = () => request.get("/dj/banner");
// 获取付费精品电台
export const getPaidRadio = params => request.get("/dj/paygift", { params });
// 获取推荐电台分类
export const getRecommendRadioCate = () =>
  request.get("/dj/category/recommend");
// 获取分类推荐电台列表
export const getRadioList = params =>
  request.get("/dj/recommend/type", { params });
// 电台详情
export const getRadioDetail = params => request.get("/dj/detail", { params });
// 电台节目列表
export const getRadioPrograms = params =>
  request.get("/dj/program", { params });

// 电台节目详情
export const getRadioProgramDetail = params =>
  request.get("/dj/program/detail", { params });

// 电台节目评论
export const getProgramComments = params =>
  request.get("/comment/dj", { params });
// 电台订阅者
export const getRadioSubscribers = params =>
  request.get("/dj/subscriber", { params });
// 电台分类
export const getRadioCateList = () => request.get("/dj/catelist");
