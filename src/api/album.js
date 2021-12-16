import request from "@/utils/request.js";

// 专辑详情
export const getAlbumDetail = params => request.get("/album", { params });
// 专辑动态信息
export const getAlbumDynamicInfo = params =>
  request.get("/album/detail/dynamic", { params });
// 专辑评论
export const getAlbumComments = params =>
  request.get("/comment/album", { params });
// 取消/收藏专辑
export const subscribeAlbum = params => request.get("/album/sub", { params });
// 新碟上架
export const getNewAlbum = params => request.get("/album/new", { params });
