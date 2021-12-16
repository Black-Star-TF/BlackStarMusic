import request from "@/utils/request.js";

// 获取排行榜数据
export const getToplist = () => request.get("/toplist");

// 获取排行榜详情
// params: { id }
export const getToplistDetail = params => request.get("/top/list", { params });

// 获取歌手排行榜
export const getArtistToplist = () => request.get("/toplist/artist");
